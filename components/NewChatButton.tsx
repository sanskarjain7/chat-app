import { useState } from 'react';

interface NewChatButtonProps {
    onCreateChat: (name: string) => void;
}

export default function NewChatButton({ onCreateChat }: NewChatButtonProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [chatName, setChatName] = useState('');

    const handleCreateChat = () => {
        if (chatName.trim()) {
            onCreateChat(chatName.trim());
            setChatName('');
            setIsCreating(false);
        }
    };

    return (
        <div className="max-w-[300px]">
            {isCreating ? (
                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        className="flex-1 min-w-0 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Chat name..."
                        autoFocus
                    />
                    <button
                        onClick={handleCreateChat}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 whitespace-nowrap"
                    >
                        Create
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsCreating(true)}
                    className="w-full px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600"
                >
                    New Chat
                </button>
            )}
        </div>
    );
}