import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import AuthDialog from '@/components/AuthDialog';
import PaymentDialog from '@/components/PaymentDialog';
import SupportDialogs from '@/components/SupportDialogs';
import Footer from '@/components/Footer';

interface Game {
  id: number;
  title: string;
  price: number;
  discount: number;
  genre: string;
  image: string;
  isNew: boolean;
}

interface CartItem extends Game {
  quantity: number;
}

const games: Game[] = [
  {
    id: 1,
    title: "Cyber Nexus 2084",
    price: 1999,
    discount: 30,
    genre: "RPG",
    image: "/img/4d5ad517-35c7-446f-8044-2584b453ebe2.jpg",
    isNew: true
  },
  {
    id: 2,
    title: "Neon Velocity",
    price: 1499,
    discount: 50,
    genre: "Racing",
    image: "/img/49331fa8-5a18-41b1-a40a-25b8965da1ff.jpg",
    isNew: false
  },
  {
    id: 3,
    title: "Digital Warfare",
    price: 2499,
    discount: 0,
    genre: "Shooter",
    image: "/img/46055c7c-8480-48a7-83cc-2fe80b85623e.jpg",
    isNew: true
  },
  {
    id: 4,
    title: "Matrix Protocol",
    price: 1799,
    discount: 25,
    genre: "Strategy",
    image: "/img/636a75ca-c7fb-4aad-9a05-e0fbbc338dcc.jpg",
    isNew: false
  },
  {
    id: 5,
    title: "Ghost in the Shell",
    price: 2199,
    discount: 15,
    genre: "Adventure",
    image: "/img/b82fe8e3-27c2-4a6e-97a2-653f58f517f4.jpg",
    isNew: true
  },
  {
    id: 6,
    title: "Synthetic Dreams",
    price: 1299,
    discount: 40,
    genre: "Indie",
    image: "/img/c8bcb902-1850-4c72-841c-f2b29bece52a.jpg",
    isNew: false
  }
];

const genres = ["Все", "RPG", "Shooter", "Racing", "Strategy", "Adventure", "Indie"];

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<{email: string; name: string} | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState({ name: '', email: '', message: '' });
  const [chatMessages, setChatMessages] = useState<{text: string; isUser: boolean; time: string}[]>([
    { text: 'Здравствуйте! Чем могу помочь?', isUser: false, time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }
  ]);
  const [chatInput, setChatInput] = useState('');
  const { toast } = useToast();

  const filteredGames = games.filter(game => {
    const matchesGenre = selectedGenre === "Все" || game.genre === selectedGenre;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const newGames = games.filter(g => g.isNew);
  const discountGames = games.filter(g => g.discount > 0);

  const addToCart = (game: Game) => {
    const existingItem = cart.find(item => item.id === game.id);
    
    if (existingItem) {
      toast({
        title: "Игра уже в корзине",
        description: `${game.title} уже добавлена в корзину`,
        variant: "destructive"
      });
      return;
    }

    setCart([...cart, { ...game, quantity: 1 }]);
    toast({
      title: "Добавлено в корзину",
      description: `${game.title} добавлена в корзину`,
    });
  };

  const removeFromCart = (gameId: number) => {
    setCart(cart.filter(item => item.id !== gameId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discount > 0 
        ? Math.round(item.price * (1 - item.discount / 100))
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Оплата успешна! 🎮",
      description: `Ваш заказ на сумму ${getTotalPrice()}₽ обработан. Игры добавлены в библиотеку!`,
    });

    setCart([]);
    setIsPaymentOpen(false);
    setPaymentData({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      setUser({ email: authData.email, name: authData.name });
      toast({ title: "Регистрация успешна!", description: `Добро пожаловать, ${authData.name}!` });
    } else {
      setUser({ email: authData.email, name: authData.email.split('@')[0] });
      toast({ title: "Вход выполнен!", description: "Добро пожаловать!" });
    }
    setIsAuthOpen(false);
    setAuthData({ email: '', password: '', name: '' });
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: `Мы ответим вам на ${supportMessage.email} в ближайшее время`,
    });
    setSupportMessage({ name: '', email: '', message: '' });
    setIsSupportOpen(false);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = {
      text: chatInput,
      isUser: true,
      time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})
    };
    
    setChatMessages([...chatMessages, userMsg]);
    setChatInput('');
    
    setTimeout(() => {
      const botResponses = [
        'Спасибо за ваш вопрос! Специалист скоро подключится.',
        'Мы получили ваше сообщение. Уточните, пожалуйста, подробности.',
        'Понял вас! Сейчас проверю информацию и отвечу.',
      ];
      const botMsg = {
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cyber-darker cyber-grid">
      <Header
        user={user}
        cart={cart}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedGenre={setSelectedGenre}
        setIsAuthOpen={setIsAuthOpen}
        setAuthMode={setAuthMode}
        setUser={setUser}
        setIsPaymentOpen={setIsPaymentOpen}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />

      <AuthDialog
        isOpen={isAuthOpen}
        setIsOpen={setIsAuthOpen}
        authMode={authMode}
        setAuthMode={setAuthMode}
        authData={authData}
        setAuthData={setAuthData}
        onSubmit={handleAuthSubmit}
      />

      <PaymentDialog
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
        paymentData={paymentData}
        setPaymentData={setPaymentData}
        getTotalPrice={getTotalPrice}
        onSubmit={handlePayment}
      />

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-6 animate-slide-up">
            <h2 className="text-6xl font-bold neon-glow text-primary">
              БУДУЩЕЕ ИГР ЗДЕСЬ
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Погрузитесь в мир киберпанка с эксклюзивными PC-играми
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="neon-border bg-primary text-primary-foreground hover:bg-primary/90">
                <Icon name="Gamepad2" size={24} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="neon-border-secondary border-secondary text-secondary hover:bg-secondary/10">
                <Icon name="Zap" size={24} className="mr-2" />
                Акции недели
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск игр..."
                className="pl-10 bg-muted/50 border-primary/30 focus:border-primary text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-muted/50 border border-primary/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Все игры
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Sparkles" size={16} className="mr-2" />
                Новинки
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                <Icon name="Percent" size={16} className="mr-2" />
                Акции
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="mb-6 flex gap-2 flex-wrap">
                {genres.map(genre => (
                  <Badge
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedGenre === genre 
                        ? 'neon-border bg-primary text-primary-foreground' 
                        : 'border-primary/30 hover:border-primary text-foreground'
                    }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} onAddToCart={addToCart} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newGames.map((game) => (
                  <GameCard key={game.id} game={game} onAddToCart={addToCart} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discountGames.map((game) => (
                  <GameCard key={game.id} game={game} onAddToCart={addToCart} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer
        setIsSupportOpen={setIsSupportOpen}
        setIsChatOpen={setIsChatOpen}
      />

      <SupportDialogs
        isSupportOpen={isSupportOpen}
        setIsSupportOpen={setIsSupportOpen}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        supportMessage={supportMessage}
        setSupportMessage={setSupportMessage}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        onSupportSubmit={handleSupportSubmit}
        onChatSubmit={handleChatSubmit}
      />
    </div>
  );
};

export default Index;
