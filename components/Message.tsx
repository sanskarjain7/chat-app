import { Message } from './types';
import { useState } from 'react';

interface MessageProps {
    message: Message;
    onDeleteMessage: (messageId: string) => void;
}

export default function MessageComponent({ message, onDeleteMessage }: MessageProps) {
    const isCurrentUser = message.senderId === 'current-user';
    const [isHovered, setIsHovered] = useState(false);


    return (
        <div

            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`max-w-[70%] rounded-lg p-3 ${isCurrentUser
                    ? 'bg-red-500 text-white'
                    : ' bg-slate-800 text-slate-100'
                    }`}
            >
                <div className="flex items-baseline gap-2 justify-between">
                    <div>
                        <span className="text-sm font-medium">{message.senderName}</span>
                        <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>
                    <div className='flex justify-end'>
                        {isHovered &&
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteMessage(message.id);
                                    }}
                                    className="text-white-500 hover:text-white-500"
                                >
                                    ×
                                </button>

                            </div>
                        }
                    </div>
                </div>
                <p className="mt-1">{message.content}</p>
            </div>
        </div>
    );
}