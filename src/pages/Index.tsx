import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('главная');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const stats = [
    { value: '2.4M+', label: 'Активных пользователей', icon: 'Users' },
    { value: '150K+', label: 'Серверов', icon: 'Server' },
    { value: '99.9%', label: 'Uptime', icon: 'Zap' },
    { value: '24/7', label: 'Поддержка', icon: 'Headphones' }
  ];

  const features = [
    {
      icon: 'MessageSquare',
      title: 'Мгновенные сообщения',
      description: 'Молниеносная доставка сообщений с end-to-end шифрованием',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'Users',
      title: 'Серверы и каналы',
      description: 'Создавайте сообщества с тематическими каналами',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'Video',
      title: 'Видео и голос',
      description: 'HD качество связи без задержек и лагов',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Ваши данные под защитой военного уровня',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'Smartphone',
      title: 'Кросс-платформа',
      description: 'Web, iOS, Android — везде одинаково удобно',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: 'Sparkles',
      title: 'AI ассистент',
      description: 'Умный бот-помощник для автоматизации задач',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const communities = [
    { name: 'MIT Общее', members: 15642, online: 8234, icon: '🚀', color: 'bg-gradient-to-br from-purple-600 to-pink-600' },
    { name: 'Геймеры', members: 12453, online: 5621, icon: '🎮', color: 'bg-gradient-to-br from-blue-600 to-cyan-600' },
    { name: 'Разработчики', members: 9876, online: 4532, icon: '💻', color: 'bg-gradient-to-br from-green-600 to-emerald-600' },
    { name: 'Художники', members: 7234, online: 3412, icon: '🎨', color: 'bg-gradient-to-br from-orange-600 to-red-600' },
    { name: 'Музыка', members: 11234, online: 6789, icon: '🎵', color: 'bg-gradient-to-br from-violet-600 to-purple-600' },
    { name: 'Наука', members: 5678, online: 2341, icon: '🔬', color: 'bg-gradient-to-br from-teal-600 to-blue-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MIT
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Главная', 'Сообщество', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all ${
                    activeSection === item.toLowerCase()
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
              Войти
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeSection === 'главная' && (
        <div className="pt-32 pb-20 px-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="text-center mb-20">
              <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
                <span className="text-sm text-purple-300">✨ Новое поколение мессенджеров</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                Общайтесь
                <br />
                без границ
              </h1>
              
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Современный мессенджер для команд, сообществ и друзей.
                Мгновенные сообщения, голос, видео — всё в одном месте.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg border-0 hover-scale">
                  <Icon name="Download" className="mr-2" size={20} />
                  Скачать MIT
                </Button>
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg hover-scale">
                  <Icon name="Play" className="mr-2" size={20} />
                  Демо
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover-scale"
                >
                  <div className="flex flex-col items-center text-center">
                    <Icon name={stat.icon} className="text-purple-400 mb-3" size={32} />
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-center mb-4 text-white">
                Всё что нужно для общения
              </h2>
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Мощный функционал, продуманный до мелочей
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover-scale group"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon name={feature.icon} className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <Card className="p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-purple-500/30 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Готовы начать?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к миллионам пользователей, которые уже выбрали MIT
              </p>
              <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold border-0 hover-scale">
                Создать аккаунт бесплатно
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Community Section */}
      {activeSection === 'сообщество' && (
        <div className="pt-32 pb-20 px-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Активные сообщества
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Найдите единомышленников и присоединяйтесь к тысячам серверов
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Поиск сообществ..."
                  className="pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Communities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {communities.map((community, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover-scale cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-2xl ${community.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                      {community.icon}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm text-green-400">{community.online.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{community.name}</h3>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Icon name="Users" size={16} className="mr-1" />
                      <span>{community.members.toLocaleString()} участников</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                    Присоединиться
                  </Button>
                </Card>
              ))}
            </div>

            {/* Create Server CTA */}
            <Card className="p-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-lg border border-blue-500/30 text-center">
              <Icon name="PlusCircle" className="text-blue-400 mx-auto mb-4" size={64} />
              <h2 className="text-3xl font-bold text-white mb-4">
                Создайте свой сервер
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Соберите свою команду или сообщество в одном месте
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg border-0 hover-scale">
                <Icon name="Plus" className="mr-2" size={20} />
                Создать сервер
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Contacts Section */}
      {activeSection === 'контакты' && (
        <div className="pt-32 pb-20 px-6 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Свяжитесь с нами
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Есть вопросы? Мы всегда на связи 24/7
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Info Cards */}
              <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover-scale">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-400">support@mit-messenger.com</p>
                    <p className="text-gray-400">business@mit-messenger.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover-scale">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Поддержка</h3>
                    <p className="text-gray-400">Telegram: @mit_support</p>
                    <p className="text-gray-400">Discord: MIT Support</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover-scale">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Офис</h3>
                    <p className="text-gray-400">Москва, Россия</p>
                    <p className="text-gray-400">Невский проспект, 123</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover-scale">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Телефон</h3>
                    <p className="text-gray-400">+7 (999) 123-45-67</p>
                    <p className="text-gray-400">Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Напишите нам</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ваше имя
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Расскажите, чем мы можем помочь..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 min-h-32"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg border-0 hover-scale"
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon name="Zap" className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold text-white">MIT</span>
              </div>
              <p className="text-gray-400 text-sm">
                Новое поколение мессенджеров для команд и сообществ
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Скачать</li>
                <li className="hover:text-white cursor-pointer transition-colors">Возможности</li>
                <li className="hover:text-white cursor-pointer transition-colors">Безопасность</li>
                <li className="hover:text-white cursor-pointer transition-colors">Цены</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-white cursor-pointer transition-colors">Блог</li>
                <li className="hover:text-white cursor-pointer transition-colors">Карьера</li>
                <li className="hover:text-white cursor-pointer transition-colors">Пресса</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Социальные сети</h4>
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all hover-scale">
                  <Icon name="Github" className="text-gray-400" size={20} />
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all hover-scale">
                  <Icon name="Twitter" className="text-gray-400" size={20} />
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-all hover-scale">
                  <Icon name="Youtube" className="text-gray-400" size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 MIT Messenger. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer transition-colors">Политика конфиденциальности</span>
              <span className="hover:text-white cursor-pointer transition-colors">Условия использования</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
