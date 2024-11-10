import { Chat, Message } from '@/components/types';

// Dummy data for initial chats
const INITIAL_CHATS: Chat[] = [
    {
        id: '1',
        name: 'General Chat',
        messages: [
            {
                id: '1',
                content: 'Welcome to the general chat!',
                timestamp: new Date('2024-03-10T10:00:00'),
                senderId: 'system',
                senderName: 'System'
            }
        ],
        lastMessage: {
            id: '1',
            content: 'Welcome to the general chat!',
            timestamp: new Date('2024-03-10T10:00:00'),
            senderId: 'system',
            senderName: 'System'
        }
    },
    {
        id: '2',
        name: 'Random Topics',
        messages: [],
    }
];

// Mock responses for incoming messages
const MOCK_RESPONSES = [
    "Hey there! How are you?",
    "That's interesting! Tell me more.",
    "I'm working on some exciting projects.",
    "Have you tried the new features?",
    "Let's schedule a meeting to discuss this.",
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    // Get initial chats
    getChats: async (): Promise<Chat[]> => {
        await delay(800);
        return INITIAL_CHATS;
    },

    // Simulate receiving a message
    receiveMessage: async (chatId: string): Promise<Message> => {
        await delay(1000 + Math.random() * 2000); // Random delay between 1-3 seconds

        return {
            id: Date.now().toString(),
            content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
            timestamp: new Date(),
            senderId: 'bot',
            senderName: 'ChatBot'
        };
    }
};