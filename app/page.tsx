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

  const handleUpdateMessages = async (chatId: string, newMessage: Message) => {
    setChats(prevChats => prevChats.map(chat =>
      chat.id === chatId
        ? {
          ...chat,
          messages: [...chat.messages, newMessage],
        }
        : chat
    ));

    try {
      const response = await mockApi.receiveMessage();
      const currentChat = chats.find(chat => chat.id === chatId);
      if (!currentChat) return;
      const botResponse = {
        ...response,
        senderName: currentChat.name
      };

      setChats(prevChats => prevChats.map(chat =>
        chat.id === chatId
          ? {
            ...chat,
            messages: [...chat.messages, botResponse],
          }
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
  const onDeleteMessage = (messageId: string) => {
    setChats(prevChats => prevChats.map(chat => ({
      ...chat,
      messages: chat.messages.filter(message => message.id !== messageId)
    })));
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white-500">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] border-r border-red-200 p-4 overflow-y-auto h-screen">
        <NewChatButton onCreateChat={handleCreateChat} />
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {selectedChat ? (
          <ChatWindow
            chat={chats.find(c => c.id === selectedChat)!}
            onUpdateMessages={(newMessage) => handleUpdateMessages(selectedChat, newMessage)}
            onDeleteMessage={onDeleteMessage}
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