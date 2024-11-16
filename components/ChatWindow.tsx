import { useState, useRef, useEffect } from 'react';
import { Message, Chat } from './types';
import MessageComponent from './Message';

interface ChatWindowProps {
    chat: Chat;
    onUpdateMessages: (messages: Message) => void;
    onDeleteMessage: (messageId: string) => void;
}

export default function ChatWindow({ chat, onUpdateMessages, onDeleteMessage }: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat.messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                content: newMessage.trim(),
                timestamp: new Date(),
                senderId: 'current-user',
                senderName: 'You'
            };
            onUpdateMessages(message);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chat.messages.map((message) => (
                    <MessageComponent key={message.id} message={message} onDeleteMessage={onDeleteMessage} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="border-t p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}