"use client";
import { useEffect, useState } from "react";
import ChatList from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";
import NewChatButton from "@/components/NewChatButton";
import { Chat, Message } from '@/components/types';
import { mockApi } from '@/api/mockApi';

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      const initialChats = await mockApi.getChats();
      setChats(initialChats);
      setIsLoading(false);
    };
    loadChats();
  }, []);

  // Simulate receiving messages when a message is sent
  const handleUpdateMessages = async (chatId: string, messages: Message[]) => {
    setChats(chats.map(chat =>
      chat.id === chatId
        ? { ...chat, messages, lastMessage: messages[messages.length - 1] }
        : chat
    ));

    try {
      const response = await mockApi.receiveMessage(chatId);
      const updatedMessages = [...messages, response];
      setChats(chats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: updatedMessages, lastMessage: response }
          : chat
      ));
    } catch (error) {
      console.error('Error receiving message:', error);
    }
  };
  const handleCreateChat = (name: string) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name,
      messages: []
    };
    setChats([...chats, newChat]);
    setSelectedChat(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setSelectedChat(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white-500">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] border-r border-red-200 dark:border-red-800 p-4">
        <NewChatButton onCreateChat={handleCreateChat} />
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>
      <main className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatWindow
            chatId={selectedChat}
            chat={chats.find(c => c.id === selectedChat)!}
            onUpdateMessages={(messages) => handleUpdateMessages(selectedChat, messages)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white-500">
            Select a chat or create a new one to get started
          </div>
        )}
      </main>
    </div>
  );

}