import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GoogleGenAI, Modality, Type, FunctionDeclaration, Chat } from '@google/genai';
import { MOCK_PROJECTS } from '../data/projects';

// --- Types ---
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    isFinal?: boolean;
    functionResult?: FunctionResult;
}

interface FunctionResult {
    name: string;
    data: any;
}
interface SavedOpportunity {
    title: string;
    url: string;
    category: string;
}

// --- Audio Helper Functions ---
function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
}


// --- Mock API for Agent Actions ---
const MOCK_API = {
    getProjectFinancials: (projectId: string) => ({
        budget: '$50,000',
        spent: '$22,750',
        remaining: '$27,250',
        burnRate: '$1,500/day',
    }),
    sendMessageToCrew: (recipient: string, message: string) => ({
        recipient,
        message,
        status: 'Sent successfully',
    }),
    saveOpportunity: (opportunity: SavedOpportunity) => {
        const saved = JSON.parse(localStorage.getItem('nebula-saved-opportunities') || '[]');
        if (!saved.find((o: SavedOpportunity) => o.title === opportunity.title)) {
            saved.push(opportunity);
            localStorage.setItem('nebula-saved-opportunities', JSON.stringify(saved));
        }
        return { status: 'Success', savedItem: opportunity.title };
    },
};

// --- Function Declarations for Gemini ---
const functionDeclarations: FunctionDeclaration[] = [
    {
        name: 'getProjectFinancials',
        parameters: { type: Type.OBJECT, properties: {} },
        description: 'Get a summary of the current project\'s financial status, including budget, spent, and remaining funds.',
    },
    {
        name: 'sendMessageToCrew',
        parameters: {
            type: Type.OBJECT, properties: {
                recipient: { type: Type.STRING, description: 'The crew member or team to send the message to (e.g., "DP", "Editor", "Entire Crew").' },
                message: { type: Type.STRING, description: 'The content of the message.' },
            }, required: ['recipient', 'message'],
        },
        description: 'Sends a message to a crew member or the entire team on the user\'s behalf.',
    },
    {
        name: 'saveOpportunity',
        parameters: {
            type: Type.OBJECT, properties: {
                title: { type: Type.STRING, description: 'The exact title of the grant, festival, or event to save.' },
                url: { type: Type.STRING, description: 'The URL for the opportunity.' },
                category: { type: Type.STRING, description: 'The category, e.g., "Grant", "Festival".' }
            }, required: ['title', 'url', 'category'],
        },
        description: 'Saves a film industry opportunity to the user\'s personal list. Use the googleSearch tool first to find opportunities if you don\'t have the details.',
    },
];

// --- Speech Recognition Setup ---
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let recognition: any;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
}

const AIAssistantPage: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const project = useMemo(() => MOCK_PROJECTS.find(p => p.id === projectId), [projectId]);

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const aiRef = useRef<GoogleGenAI | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initializeChat = useCallback(() => {
        if (!project || !aiRef.current) return;
        const incompleteTasks = project.tasks?.filter(t => !t.completed).map(t => `- ${t.text} (Due: ${t.deadline || 'N/A'})`).join('\n') || 'No task data available.';
        const systemInstruction = `You are 'The Line', an AI Production Assistant for filmmakers. Your personality is strategic, economic, street-smart, but also caring and nurturing. Your goal is to help the user manage their project efficiently by providing clear advice and performing actions for them. You have access to tools to get financials, send messages, and find/save opportunities. Use these tools when the user asks. You can use Google Search to find up-to-date information. Always be concise and format responses for readability in a chat UI.\n\nPROJECT CONTEXT:\nCurrent Project: "${project.title}"\nUser's Role: ${project.userRole}\nIncomplete Tasks:\n${incompleteTasks}`;
        
        chatRef.current = aiRef.current.chats.create({
            model: 'gemini-2.5-pro',
            config: {
                systemInstruction,
                tools: [{ functionDeclarations: functionDeclarations }, { googleSearch: {} }],
            },
        });
    }, [project]);

    useEffect(() => {
        if (process.env.API_KEY) {
            aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
            initializeChat();
        }
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        if (recognition) {
            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        handleSend(event.results[i][0].transcript);
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setInputText(interimTranscript);
            };
            recognition.onerror = (event: any) => {
                setError(`Speech recognition error: ${event.error}`);
                setIsListening(false);
            };
            recognition.onend = () => {
                setIsListening(false);
            };
        }
        
        return () => recognition?.stop();
    }, [initializeChat]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const speak = useCallback(async (text: string) => {
        if (!aiRef.current || !audioContextRef.current || !text) return;
        try {
            const response = await aiRef.current.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                },
            });
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current);
                const source = audioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContextRef.current.destination);
                source.start();
            }
        } catch (e) {
            console.error("TTS Error:", e);
            setError("Sorry, I couldn't generate a spoken response.");
        }
    }, []);

    const handleSend = async (textToSend: string) => {
        if (!textToSend.trim() || !chatRef.current) return;
        
        const text = textToSend;
        setInputText('');
        setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
        setIsLoading(true);

        try {
            let response = await chatRef.current.sendMessage({ message: text });
            
            while (response.functionCalls && response.functionCalls.length > 0) {
                const fc = response.functionCalls[0];
                let result: any;
                let functionResultName = '';

                switch (fc.name) {
                    case 'getProjectFinancials':
                        result = MOCK_API.getProjectFinancials(projectId!);
                        functionResultName = 'Financial Report';
                        break;
                    case 'sendMessageToCrew':
                        result = MOCK_API.sendMessageToCrew(fc.args.recipient, fc.args.message);
                        functionResultName = 'Message Sent';
                        break;
                    case 'saveOpportunity':
                        result = MOCK_API.saveOpportunity(fc.args);
                        functionResultName = 'Opportunity Saved';
                        break;
                }
                
                setMessages(prev => [...prev, { id: Date.now() + 1, text: '', sender: 'ai', functionResult: { name: functionResultName, data: result } }]);
                response = await chatRef.current.sendMessage({ toolResponse: { functionResponses: { id: fc.id, name: fc.name, response: { result: JSON.stringify(result) } } } });
            }

            const responseText = response.text;
            setMessages(prev => [...prev, { id: Date.now() + 2, text: responseText, sender: 'ai' }]);
            speak(responseText);

        } catch (e: any) {
            setError(e.message || "An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleListen = () => {
        if (!recognition) {
            setError("Speech recognition is not supported by your browser.");
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                <div className="text-center flex-1">
                    <h1 className="text-lg font-bold">The Line AI</h1>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{project?.title}</p>
                </div>
                <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"><span className="material-symbols-outlined">close</span></button>
            </header>

            <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === 'user' ? 'bg-primary text-white self-end' : 'bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark self-start'}`}>
                        {msg.text}
                        {msg.functionResult && (
                             <div className="mt-2 p-2 bg-background-light dark:bg-background-dark rounded">
                                 <h3 className="font-bold text-primary text-sm mb-1">{msg.functionResult.name}</h3>
                                 <pre className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-body">{JSON.stringify(msg.functionResult.data, null, 2)}</pre>
                             </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="self-start bg-surface-light dark:bg-surface-dark rounded-lg p-3">
                        <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
                {error && <p className="text-sm text-warning text-center">{error}</p>}
                <div ref={messagesEndRef}></div>
            </main>

            <footer className="flex-shrink-0 p-4 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                        placeholder={isListening ? "Listening..." : "Ask The Line..."}
                        className="form-input w-full rounded-full border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 px-5 text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary"
                        disabled={isLoading}
                    />
                     <button onClick={toggleListen} disabled={isLoading} className={`flex-shrink-0 flex items-center justify-center size-12 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white' : 'bg-primary text-white'}`}>
                        <span className="material-symbols-outlined">{isListening ? 'mic_off' : 'mic'}</span>
                    </button>
                    <button onClick={() => handleSend(inputText)} disabled={isLoading || !inputText} className="flex-shrink-0 flex items-center justify-center size-12 rounded-full bg-primary text-white disabled:bg-border-dark disabled:cursor-not-allowed">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AIAssistantPage;