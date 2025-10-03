import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

interface HeaderProps {
  user: {email: string; name: string} | null;
  cart: CartItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSelectedGenre: (genre: string) => void;
  setIsAuthOpen: (open: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  setUser: (user: {email: string; name: string} | null) => void;
  setIsPaymentOpen: (open: boolean) => void;
  removeFromCart: (gameId: number) => void;
  getTotalPrice: () => number;
}

const Header = ({
  user,
  cart,
  activeTab,
  setActiveTab,
  setSelectedGenre,
  setIsAuthOpen,
  setAuthMode,
  setUser,
  setIsPaymentOpen,
  removeFromCart,
  getTotalPrice
}: HeaderProps) => {
  return (
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
  );
};

export default Header;
