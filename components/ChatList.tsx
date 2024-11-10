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
            {chats.map((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1];

                return (
                    <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer hover:bg-red-800 hover:text-white
                            ${selectedChat === chat.id ? 'bg-red-800 text-white' : 'text-black'
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
                        {lastMessage && (
                            <p className="text-sm text-white-500 truncate">
                                {lastMessage.content}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}