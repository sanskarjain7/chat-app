import { Chat } from './types';

interface ChatListProps {
    chats: Chat[];
    selectedChat: string | null;
    onSelectChat: (chatId: string) => void;
    onDeleteChat: (chatId: string) => void;
}

export default function ChatList({
    chats,
    selectedChat,
    onSelectChat,
    onDeleteChat
}: ChatListProps) {
    return (
        <div className="flex flex-col gap-2 mt-4 overflow-hidden">
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-800 
                        ${selectedChat === chat.id ? 'bg-red-100 dark:bg-red-800' : ''
                        }`}
                    onClick={() => onSelectChat(chat.id)}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">{chat.name}</h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteChat(chat.id);
                            }}
                            className="text-white-500 hover:text-white-500"
                        >
                            ×
                        </button>
                    </div>
                    {chat.lastMessage && (
                        <p className="text-sm text-white-500 truncate">
                            {chat.lastMessage.content}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}