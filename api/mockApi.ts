import { Chat, Message } from '@/components/types';

// Dummy data for initial chats
const INITIAL_CHATS: Chat[] = [
    {
        id: '1',
        name: 'John Doe',
        messages: [
            {
                id: '1',
                content: 'Welcome to the general chat!',
                timestamp: new Date('2024-03-10T10:00:00'),
                senderId: 'user1',
                senderName: 'John Doe'
            },
            {
                id: '2',
                content: 'Hi everyone! Excited to be here!',
                timestamp: new Date('2024-03-10T10:05:00'),
                senderId: 'user1',
                senderName: 'John Doe'
            },
            {
                id: '3',
                content: 'Hello John! Welcome to the chat.',
                timestamp: new Date('2024-03-10T10:07:00'),
                senderId: 'user1',
                senderName: 'John Doe'
            },
            {
                id: '4',
                content: 'Hey there! I am new here too.',
                timestamp: new Date('2024-03-10T10:08:00'),
                senderId: 'current-user',
                senderName: 'You'
            },
            {
                id: '5',
                content: 'How is everyone doing today?',
                timestamp: new Date('2024-03-10T10:10:00'),
                senderId: 'user1',
                senderName: 'John Doe'
            },
            {
                id: '6',
                content: 'Doing great! Looking forward to our discussions.',
                timestamp: new Date('2024-03-10T10:11:00'),
                senderId: 'current-user',
                senderName: 'You'
            }
        ]
    },
    {
        id: '2',
        name: 'Jane Doe',
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
    receiveMessage: async (): Promise<Message> => {
        await delay(1000 + Math.random() * 1000); // Random delay between 1-2 seconds

        return {
            id: Date.now().toString(),
            content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
            timestamp: new Date(),
            senderId: 'bot',
            senderName: 'ChatBot'
        };
    }
};