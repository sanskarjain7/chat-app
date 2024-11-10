import { Message } from './types';

interface MessageProps {
    message: Message;
}

export default function MessageComponent({ message }: MessageProps) {
    const isCurrentUser = message.senderId === 'current-user';

    return (
        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[70%] rounded-lg p-3 ${isCurrentUser
                    ? 'bg-red-500 text-white'
                    : 'bg-red-100 dark:bg-red-800'
                    }`}
            >
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium">{message.senderName}</span>
                    <span className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                        })}
                    </span>
                </div>
                <p className="mt-1">{message.content}</p>
            </div>
        </div>
    );
}