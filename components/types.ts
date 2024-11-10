export interface Message {
    id: string;
    content: string;
    timestamp: Date;
    senderId: string;
    senderName: string;
}

export interface Chat {
    id: string;
    name: string;
    messages: Message[];
}