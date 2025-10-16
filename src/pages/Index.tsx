import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Settings, User, Plus, Send, Mic, Paperclip, Smile, Hash, Phone, Video, Sun, Moon, Star, Heart, ThumbsUp, Shield, Zap, Bot, Crown, Volume2, VolumeX } from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [activeServer, setActiveServer] = useState('mit');
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState('chat');
  const [newItemName, setNewItemName] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Пользователь MIT',
    description: 'Новый пользователь MIT мессенджера',
    phone: '+7 (999) 123-45-67'
  });
  const [isMuted, setIsMuted] = useState(false);
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [onlineUsers] = useState(24);
  
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Поддержка MIT',
      avatar: 'П',
      lastMessage: 'Добро пожаловать в MIT! Мы рады видеть вас здесь.',
      time: 'Только что',
      unread: 0,
      isBot: true
    }
  ]);
  const [servers, setServers] = useState([
    { id: 'mit', name: 'MIT', icon: 'M', isOwner: true },
    { id: 'tech', name: 'Технологии', icon: 'T', isOwner: false },
    { id: 'gaming', name: 'Игры', icon: 'G', isOwner: false },
    { id: 'art', name: 'Искусство', icon: 'A', isOwner: false }
  ]);
  
  const messageInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const channels: Record<string, any[]> = {
    mit: [
      { id: 'general', name: 'общее', type: 'text', members: 156 },
      { id: 'announcements', name: 'объявления', type: 'text', members: 156 },
      { id: 'voice-lounge', name: 'Голосовой чат', type: 'voice', members: 8 }
    ],
    tech: [
      { id: 'coding', name: 'программирование', type: 'text', members: 89 },
      { id: 'ai-discussion', name: 'искусственный интеллект', type: 'text', members: 67 },
      { id: 'tech-voice', name: 'Технический голосовой', type: 'voice', members: 12 }
    ]
  };

  const [chatMessages, setChatMessages] = useState<Record<number, any[]>>({
    1: [
      { id: 1, sender: 'Поддержка', content: 'Приветствуем вас в MIT! 🎉', time: '10:00', type: 'text', reactions: [] },
      { id: 2, sender: 'Поддержка', content: 'MIT — это современный мессенджер, объединяющий лучшие функции Telegram и Discord.', time: '10:00', type: 'text', reactions: [] },
      { id: 3, sender: 'Поддержка', content: 'Здесь вы можете общаться в личных чатах, создавать серверы для сообществ и участвовать в тематических каналах.', time: '10:01', type: 'text', reactions: [] },
      { id: 4, sender: 'Поддержка', content: 'Используйте левую панель для навигации по серверам, а среднюю — для личных сообщений.', time: '10:01', type: 'text', reactions: [] },
      { id: 5, sender: 'Поддержка', content: 'Удачи и приятного общения! 💜', time: '10:02', type: 'text', reactions: [] }
    ]
  });

  const reactions = [
    { icon: '👍', component: ThumbsUp },
    { icon: '❤️', component: Heart },
    { icon: '⭐', component: Star },
    { icon: '😄', component: Smile }
  ];

  useEffect(() => {
    if (selectedChat?.id === 1) {
      const simulateTyping = () => {
        setTypingUsers(['Поддержка']);
        setTimeout(() => setTypingUsers([]), 3000);
      };
      const typingInterval = setInterval(simulateTyping, 10000);
      return () => clearInterval(typingInterval);
    }
  }, [selectedChat]);

  const handleCreateItem = () => {
    if (!newItemName.trim()) return;
    
    if (createType === 'chat') {
      const newChat = {
        id: Date.now(),
        name: newItemName,
        avatar: newItemName.charAt(0).toUpperCase(),
        lastMessage: 'Новый чат создан',
        time: 'Только что',
        unread: 0,
        isBot: false
      };
      setChats(prev => [...prev, newChat]);
      setChatMessages(prev => ({
        ...prev,
        [newChat.id]: []
      }));
    } else if (createType === 'server') {
      const newServer = {
        id: newItemName.toLowerCase().replace(/\s+/g, '-'),
        name: newItemName,
        icon: newItemName.charAt(0).toUpperCase(),
        isOwner: true
      };
      setServers(prev => [...prev, newServer]);
    }
    
    setShowCreateModal(false);
    setNewItemName('');
    setCreateType('chat');
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const currentTime = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        id: Date.now(),
        sender: 'Вы',
        content: message,
        time: currentTime,
        type: 'text',
        reactions: []
      };
      
      const updatedMessages = [...(chatMessages[selectedChat.id] || []), newMessage];
      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id]: updatedMessages
      }));
      
      setChats(prev => 
        prev.map(chat => 
          chat.id === selectedChat.id 
            ? { ...chat, lastMessage: message, time: 'Только что' }
            : chat
        )
      );
      
      setMessage('');
      
      if (selectedChat.id === 1) {
        setTimeout(() => {
          const autoReply = {
            id: Date.now() + 1,
            sender: 'Поддержка',
            content: 'Сейчас все модераторы заняты, они вам ответят как только освободятся.',
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            type: 'text',
            reactions: []
          };
          setChatMessages(prev => ({
            ...prev,
            [selectedChat.id]: [...prev[selectedChat.id], autoReply]
          }));
        }, 1000);
      }
      
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    
    if (selectedChat?.id === 1 && message.trim()) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
      }, 300);
    }
  };

  const handleReaction = (messageId: number, reaction: string) => {
    setChatMessages(prev => ({
      ...prev,
      [selectedChat.id]: prev[selectedChat.id].map(msg => 
        msg.id === messageId 
          ? { ...msg, reactions: [...msg.reactions, reaction] }
          : msg
      )
    }));
    setShowReactions(null);
  };

  const LoginPage = () => {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-orange-50 to-yellow-50'} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-purple-500' : 'bg-orange-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}></div>
          <div className={`absolute top-3/4 right-1/4 w-96 h-96 ${darkMode ? 'bg-violet-600' : 'bg-yellow-500'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`} style={{ animationDelay: '2s' }}></div>
          <div className={`absolute bottom-1/4 left-1/2 w-96 h-96 ${darkMode ? 'bg-purple-400' : 'bg-orange-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`} style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className={`text-6xl font-bold ${darkMode ? 'bg-gradient-to-r from-purple-400 to-violet-600' : 'bg-gradient-to-r from-orange-500 to-yellow-600'} bg-clip-text text-transparent mb-2`}>
                MIT
              </h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Соединяйтесь. Создавайте. Общайтесь.</p>
            </div>

            <div className={`${darkMode ? 'bg-black/30 border-purple-500/20' : 'bg-white/80 border-orange-300'} p-8 rounded-2xl border shadow-2xl backdrop-blur-lg`}>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Электронная почта"
                  className={`w-full px-4 py-3 ${darkMode ? 'bg-black/30 border-purple-500/30 text-white placeholder-gray-400' : 'bg-white/70 border-orange-300 text-gray-800 placeholder-gray-500'} rounded-lg border focus:outline-none focus:ring-2 transition-all ${darkMode ? 'focus:border-purple-500 focus:ring-purple-500/20' : 'focus:border-orange-400 focus:ring-orange-400/20'}`}
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  className={`w-full px-4 py-3 ${darkMode ? 'bg-black/30 border-purple-500/30 text-white placeholder-gray-400' : 'bg-white/70 border-orange-300 text-gray-800 placeholder-gray-500'} rounded-lg border focus:outline-none focus:ring-2 transition-all ${darkMode ? 'focus:border-purple-500 focus:ring-purple-500/20' : 'focus:border-orange-400 focus:ring-orange-400/20'}`}
                />
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${darkMode ? 'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white' : 'bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white'}`}
                >
                  Войти
                </button>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${darkMode ? 'bg-transparent border border-purple-500/30 text-purple-400 hover:bg-purple-500/10' : 'bg-transparent border border-orange-300 text-orange-600 hover:bg-orange-100'}`}
                >
                  Создать аккаунт
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = () => (
    <div className={`w-64 ${darkMode ? 'bg-black/80 border-purple-500/20' : 'bg-white/80 border-orange-300'} backdrop-blur-lg border-r flex flex-col h-full`}>
      <div className="p-4 flex flex-col items-center space-y-4">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => setActiveServer(server.id)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 relative ${darkMode ? activeServer === server.id ? 'bg-gradient-to-r from-purple-600 to-violet-700 shadow-lg shadow-purple-500/30 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white' : activeServer === server.id ? 'bg-gradient-to-r from-orange-500 to-yellow-600 shadow-lg text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            {server.icon}
            {server.isOwner && (
              <Crown className={`absolute -top-1 -right-1 w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-orange-500'}`} />
            )}
          </button>
        ))}
        <button 
          onClick={() => {
            setShowCreateModal(true);
            setCreateType('server');
          }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-purple-400' : 'bg-gray-200 hover:bg-gray-300 text-orange-500'}`}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {channels[activeServer]?.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setSelectedChat(channel)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${selectedChat?.id === channel.id ? darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-orange-200 text-orange-700' : darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'}`}
          >
            {channel.type === 'text' ? <Hash size={16} /> : <Phone size={16} />}
            <span className="font-medium">{channel.name}</span>
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({channel.members})</span>
          </button>
        ))}
      </div>
    </div>
  );

  const ChatList = () => (
    <div className={`w-80 ${darkMode ? 'bg-black/80 border-purple-500/20' : 'bg-white/80 border-orange-300'} backdrop-blur-lg border-r flex flex-col h-full`}>
      <div className={`p-4 border-b ${darkMode ? 'border-purple-500/20' : 'border-orange-300'} flex items-center justify-between`}>
        <h2 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Личные сообщения</h2>
        <button 
          onClick={() => {
            setShowCreateModal(true);
            setCreateType('chat');
          }}
          className={`p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-100'}`}
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`p-4 flex items-center space-x-3 cursor-pointer transition-all duration-300 ${darkMode ? selectedChat?.id === chat.id ? 'bg-purple-500/10 border-l-2 border-purple-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50' : selectedChat?.id === chat.id ? 'bg-orange-100 border-l-2 border-orange-500 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold relative ${darkMode ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white' : 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white'}`}>
              {chat.avatar}
              {chat.isBot && <Bot className={`absolute -bottom-1 -right-1 w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {chat.name}
                  {chat.isBot && <span className={`ml-1 text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>бот</span>}
                </h3>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{chat.time}</span>
              </div>
              <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ChatWindow = () => {
    if (!selectedChat) {
      return (
        <div className={`flex-1 flex items-center justify-center ${darkMode ? 'bg-black/50' : 'bg-gray-100'}`}>
          <div className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg">Выберите чат для начала общения</p>
          </div>
        </div>
      );
    }

    const currentMessages = chatMessages[selectedChat.id] || [];

    return (
      <div className={`flex-1 flex flex-col ${darkMode ? 'bg-black/50' : 'bg-gray-50'}`}>
        <div className={`p-4 border-b ${darkMode ? 'border-purple-500/20' : 'border-orange-300'} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${darkMode ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white' : 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white'}`}>
              {selectedChat.type ? 'M' : selectedChat.avatar}
            </div>
            <div>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedChat.name}
                {selectedChat.type === 'voice' && (
                  <span className={`ml-2 text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {channels[activeServer]?.find(c => c.id === selectedChat.id)?.members} онлайн
                  </span>
                )}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedChat.type === 'voice' ? 'В голосовом канале' : 'В сети'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} transition-colors`}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button 
              onClick={() => {
                setShowVoiceCall(true);
                setTimeout(() => setShowVoiceCall(false), 5000);
              }}
              className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} transition-colors`}
            >
              <Phone size={20} />
            </button>
            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} transition-colors`}>
              <Video size={20} />
            </button>
          </div>
        </div>

        {typingUsers.length > 0 && (
          <div className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-400 bg-gray-900/50' : 'text-gray-600 bg-gray-200'}`}>
            {typingUsers.join(', ')} печатает...
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs lg:max-w-md p-3 rounded-2xl transition-all duration-300 relative ${msg.sender === 'Вы' ? darkMode ? 'ml-auto bg-gradient-to-r from-purple-600/20 to-violet-700/20 border border-purple-500/30 text-white' : 'ml-auto bg-gradient-to-r from-orange-200 to-yellow-200 border border-orange-300 text-gray-900' : darkMode ? 'mr-auto bg-gray-800/50 text-gray-300' : 'mr-auto bg-gray-200 text-gray-700'}`}
              onMouseEnter={() => setShowReactions(msg.id)}
              onMouseLeave={() => setShowReactions(null)}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'Вы' ? darkMode ? 'text-purple-300' : 'text-orange-600' : darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {msg.time}
              </p>
              
              {msg.reactions.length > 0 && (
                <div className="flex space-x-1 mt-2">
                  {msg.reactions.map((reaction: string, index: number) => (
                    <span key={index} className="text-xs">{reaction}</span>
                  ))}
                </div>
              )}
              
              {showReactions === msg.id && (
                <div className="absolute -bottom-8 left-0 flex space-x-1 bg-black/80 rounded-lg p-1 z-10">
                  {reactions.map((reaction, index) => (
                    <button
                      key={index}
                      onClick={() => handleReaction(msg.id, reaction.icon)}
                      className="p-1 text-white hover:bg-white/20 rounded"
                    >
                      {reaction.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`p-4 border-t ${darkMode ? 'border-purple-500/20' : 'border-orange-300'}`}>
          <div className={`flex items-center space-x-3 rounded-2xl p-2 border ${darkMode ? 'bg-black/30 border-purple-500/20' : 'bg-white/70 border-orange-300'}`}>
            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} p-2 transition-colors`}>
              <Smile size={20} />
            </button>
            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} p-2 transition-colors`}>
              <Paperclip size={20} />
            </button>
            <input
              ref={messageInputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              className={`flex-1 bg-transparent focus:outline-none ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
            />
            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} p-2 transition-colors`}>
              <Mic size={20} />
            </button>
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`p-2 rounded-xl transition-all duration-300 ${!message.trim() ? 'opacity-50 cursor-not-allowed' : darkMode ? 'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white' : 'bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white'}`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MainApp = () => (
    <div className={`flex h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'} overflow-hidden relative`}>
      <div className={`absolute top-0 left-0 right-0 z-20 ${darkMode ? 'bg-black/80 border-purple-500/20' : 'bg-white/80 border-orange-300'} backdrop-blur-lg border-b`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h1 className={`text-2xl font-bold ${darkMode ? 'bg-gradient-to-r from-purple-400 to-violet-600' : 'bg-gradient-to-r from-orange-500 to-yellow-600'} bg-clip-text text-transparent`}>
              MIT
            </h1>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <input
                type="text"
                placeholder="Поиск"
                className={`pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all w-64 ${darkMode ? 'bg-black/30 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20' : 'bg-white/70 border-orange-300 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-orange-400/20'}`}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-800 border border-green-300'}`}>
              🌐 {onlineUsers} онлайн
            </div>
            <button className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} p-2 transition-colors`}>
              <Bell size={20} />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-orange-500'} p-2 transition-colors`}
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${darkMode ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white' : 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white'}`}
            >
              {profile.name.charAt(0).toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className={`absolute top-16 right-4 w-64 p-4 rounded-xl shadow-xl z-30 ${darkMode ? 'bg-black/90 border border-purple-500/30' : 'bg-white/90 border border-orange-300'} backdrop-blur-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Настройки</h3>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30' : 'bg-orange-200 text-orange-600 hover:bg-orange-300'}`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <div className="space-y-2">
            <div className={`p-2 rounded-lg cursor-pointer ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Тема: {darkMode ? 'Темная' : 'Светлая'}</span>
            </div>
            <div 
              onClick={() => setShowProfileModal(true)}
              className={`p-2 rounded-lg cursor-pointer flex items-center space-x-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
            >
              <User size={16} />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Профиль</span>
            </div>
            <div className={`p-2 rounded-lg cursor-pointer flex items-center space-x-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
              <Shield size={16} />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Конфиденциальность</span>
            </div>
            <div className={`p-2 rounded-lg cursor-pointer flex items-center space-x-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
              <Zap size={16} />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Производительность</span>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`w-96 p-6 rounded-2xl shadow-2xl ${darkMode ? 'bg-black/90 border border-purple-500/30' : 'bg-white/90 border border-orange-300'} backdrop-blur-lg`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {createType === 'chat' ? 'Создать новый чат' : 'Создать новый сервер'}
            </h3>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={createType === 'chat' ? 'Имя контакта...' : 'Название сервера...'}
              className={`w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 transition-all ${darkMode ? 'bg-black/30 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20' : 'bg-white/70 border-orange-300 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-orange-400/20'}`}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={handleCreateItem}
                disabled={!newItemName.trim()}
                className={`flex-1 py-2 font-semibold rounded-lg transition-all ${!newItemName.trim() ? 'opacity-50 cursor-not-allowed bg-gray-700' : darkMode ? 'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white' : 'bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white'}`}
              >
                Создать
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`flex-1 py-2 font-semibold rounded-lg transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`w-96 p-6 rounded-2xl shadow-2xl ${darkMode ? 'bg-black/90 border border-purple-500/30' : 'bg-white/90 border border-orange-300'} backdrop-blur-lg`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Редактировать профиль</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Имя пользователя</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${darkMode ? 'bg-black/30 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20' : 'bg-white/70 border-orange-300 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-orange-400/20'}`}
                />
              </div>
              <div>
                <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Описание</label>
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${darkMode ? 'bg-black/30 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20' : 'bg-white/70 border-orange-300 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-orange-400/20'}`}
                />
              </div>
              <div>
                <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Номер телефона</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${darkMode ? 'bg-black/30 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20' : 'bg-white/70 border-orange-300 text-gray-900 placeholder-gray-500 focus:border-orange-400 focus:ring-orange-400/20'}`}
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowProfileModal(false)}
                className={`flex-1 py-2 font-semibold rounded-lg transition-all ${darkMode ? 'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white' : 'bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white'}`}
              >
                Сохранить
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className={`flex-1 py-2 font-semibold rounded-lg transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {showVoiceCall && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg ${darkMode ? 'bg-black/90 border border-purple-500/30' : 'bg-white/90 border border-orange-300'} backdrop-blur-lg animate-pulse`}>
          <div className="flex items-center space-x-3">
            <Phone className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-orange-500'}`} />
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Входящий голосовой вызов...</span>
          </div>
        </div>
      )}

      <div className="flex flex-1 pt-20">
        <Sidebar />
        <ChatList />
        <ChatWindow />
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <MainApp />;
};

export default Index;
