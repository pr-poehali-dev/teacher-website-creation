import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

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

  const GameCard = ({ game, onAddToCart }: { game: Game; onAddToCart: (game: Game) => void }) => (
    <Card className="bg-card/50 border-primary/30 hover:border-primary transition-all group overflow-hidden neon-border">
      <div className="relative overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {game.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground neon-border-secondary">
            -{game.discount}%
          </Badge>
        )}
        {game.isNew && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground neon-border">
            NEW
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 text-foreground">{game.title}</h3>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {game.genre}
          </Badge>
          <div className="flex items-center gap-2">
            {game.discount > 0 && (
              <span className="text-muted-foreground line-through text-sm">
                {game.price}₽
              </span>
            )}
            <span className="text-primary font-bold text-xl">
              {game.discount > 0 
                ? Math.round(game.price * (1 - game.discount / 100))
                : game.price}₽
            </span>
          </div>
        </div>
        <Button 
          onClick={() => onAddToCart(game)}
          className="w-full mt-4 neon-border bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-primary"
        >
          <Icon name="ShoppingBag" size={18} className="mr-2" />
          Купить
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-cyber-darker cyber-grid">
      <header className="border-b border-primary/30 backdrop-blur-sm sticky top-0 z-50 bg-cyber-dark/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold neon-glow text-primary">CYBER GAMES</h1>
            <nav className="flex gap-6">
              <button onClick={() => {setActiveTab('all'); document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})}} className="text-foreground hover:text-primary transition-colors">Главная</button>
              <button onClick={() => {setActiveTab('all'); document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})}} className="text-foreground hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => {setActiveTab('new'); document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})}} className="text-foreground hover:text-primary transition-colors">Новинки</button>
              <button onClick={() => {setActiveTab('sales'); document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})}} className="text-foreground hover:text-secondary transition-colors">Акции</button>
              <button onClick={() => {setActiveTab('all'); setSelectedGenre('Все'); document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'})}} className="text-foreground hover:text-primary transition-colors">Жанры</button>
            </nav>
            
            <div className="flex gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-primary neon-glow">{user.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setUser(null)}
                    className="border-primary/30 text-muted-foreground hover:text-primary"
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => {setIsAuthOpen(true); setAuthMode('login')}}
                  className="neon-border bg-primary/10 hover:bg-primary/20 text-primary border-primary"
                >
                  <Icon name="User" size={20} className="mr-2" />
                  Вход
                </Button>
              )}
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="neon-border bg-primary/10 hover:bg-primary/20 text-primary border-primary relative">
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Корзина
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-cyber-dark border-primary/30 w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-primary neon-glow">Корзина</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-muted/20 border border-primary/20">
                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-bold text-foreground">{item.title}</h4>
                              <p className="text-primary font-bold">
                                {item.discount > 0 
                                  ? Math.round(item.price * (1 - item.discount / 100))
                                  : item.price}₽
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="border-t border-primary/30 pt-4 mt-4">
                          <div className="flex justify-between text-lg font-bold mb-4">
                            <span className="text-foreground">Итого:</span>
                            <span className="text-primary neon-glow">{getTotalPrice()}₽</span>
                          </div>
                          <Button 
                            onClick={() => setIsPaymentOpen(true)}
                            className="w-full neon-border bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Icon name="CreditCard" size={20} className="mr-2" />
                            Оплатить
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="bg-cyber-dark border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-primary neon-glow">
              {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
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
          }} className="space-y-4 mt-4">
            {authMode === 'register' && (
              <div>
                <label className="text-sm text-foreground mb-2 block">Имя</label>
                <Input
                  placeholder="Ваше имя"
                  value={authData.name}
                  onChange={(e) => setAuthData({...authData, name: e.target.value})}
                  className="bg-muted/50 border-primary/30 text-foreground"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="text-sm text-foreground mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="example@cyber.net"
                value={authData.email}
                onChange={(e) => setAuthData({...authData, email: e.target.value})}
                className="bg-muted/50 border-primary/30 text-foreground"
                required
              />
            </div>
            
            <div>
              <label className="text-sm text-foreground mb-2 block">Пароль</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={authData.password}
                onChange={(e) => setAuthData({...authData, password: e.target.value})}
                className="bg-muted/50 border-primary/30 text-foreground"
                required
              />
            </div>
            
            <Button type="submit" className="w-full neon-border bg-primary text-primary-foreground hover:bg-primary/90">
              {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              {authMode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-primary hover:underline"
              >
                {authMode === 'login' ? 'Зарегистрируйтесь' : 'Войдите'}
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="bg-cyber-dark border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-primary neon-glow">Оплата заказа</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Сумма к оплате: <span className="text-primary font-bold">{getTotalPrice()}₽</span>
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePayment} className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-foreground mb-2 block">Номер карты</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                className="bg-muted/50 border-primary/30 text-foreground"
                maxLength={19}
                required
              />
            </div>
            
            <div>
              <label className="text-sm text-foreground mb-2 block">Имя на карте</label>
              <Input
                placeholder="IVAN IVANOV"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                className="bg-muted/50 border-primary/30 text-foreground"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-foreground mb-2 block">Срок действия</label>
                <Input
                  placeholder="MM/YY"
                  value={paymentData.expiry}
                  onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                  className="bg-muted/50 border-primary/30 text-foreground"
                  maxLength={5}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm text-foreground mb-2 block">CVV</label>
                <Input
                  placeholder="123"
                  type="password"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                  className="bg-muted/50 border-primary/30 text-foreground"
                  maxLength={3}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full neon-border bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Lock" size={20} className="mr-2" />
              Подтвердить оплату {getTotalPrice()}₽
            </Button>
          </form>
        </DialogContent>
      </Dialog>

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

      <footer className="border-t border-primary/30 mt-20 py-8 bg-cyber-dark/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2084 CYBER GAMES. Все права защищены в цифровом пространстве.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;