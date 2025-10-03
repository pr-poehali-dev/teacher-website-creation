import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  items: { title: string; price: number; }[];
  total: number;
  date: string;
  status: 'pending' | 'completed';
}

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

interface Game {
  id: number;
  title: string;
  price: number;
  sales: number;
  revenue: number;
}

const TeacherDashboard = () => {
  const [orders] = useState<Order[]>([
    {
      id: '001',
      customerEmail: 'user@cyber.net',
      customerName: 'Алексей',
      items: [{ title: 'Cyberpunk 2084', price: 2499 }],
      total: 2499,
      date: '2024-10-03 14:30',
      status: 'completed'
    },
    {
      id: '002',
      customerEmail: 'gamer@net.ru',
      customerName: 'Мария',
      items: [
        { title: 'Neon Runner', price: 1899 },
        { title: 'Digital Wars', price: 2199 }
      ],
      total: 4098,
      date: '2024-10-03 15:45',
      status: 'pending'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan@mail.ru',
      message: 'Здравствуйте! Не могу скачать игру после покупки. Помогите, пожалуйста.',
      date: '2024-10-03 16:20',
      read: false
    },
    {
      id: '2',
      name: 'Екатерина',
      email: 'kate@cyber.net',
      message: 'Когда будет скидка на Matrix Reborn?',
      date: '2024-10-03 12:10',
      read: true
    }
  ]);

  const [games] = useState<Game[]>([
    { id: 1, title: 'Cyberpunk 2084', price: 2499, sales: 45, revenue: 112455 },
    { id: 2, title: 'Neon Runner', price: 1899, sales: 32, revenue: 60768 },
    { id: 3, title: 'Digital Wars', price: 2199, sales: 28, revenue: 61572 },
    { id: 4, title: 'Matrix Reborn', price: 1799, sales: 51, revenue: 91749 },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в панель управления",
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный пароль",
        variant: "destructive"
      });
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const totalRevenue = games.reduce((sum, game) => sum + game.revenue, 0);
  const totalSales = games.reduce((sum, game) => sum + game.sales, 0);
  const unreadMessages = messages.filter(m => !m.read).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-cyber-dark border-primary/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary neon-glow">
              <Icon name="Lock" size={48} className="mx-auto mb-4" />
              Панель преподавателя
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Введите пароль для доступа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/50 border-primary/30 text-foreground"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Подсказка: admin123
                </p>
              </div>
              <Button type="submit" className="w-full neon-border bg-primary text-primary-foreground hover:bg-primary/90">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary neon-glow mb-2">
              Панель управления
            </h1>
            <p className="text-muted-foreground">CYBER GAMES Admin</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-cyber-dark border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="DollarSign" size={20} className="text-primary" />
                Общая выручка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary neon-glow">
                {totalRevenue.toLocaleString('ru-RU')} ₽
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyber-dark border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} className="text-primary" />
                Всего продаж
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary neon-glow">
                {totalSales}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cyber-dark border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Mail" size={20} className="text-primary" />
                Непрочитанные
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary neon-glow">
                {unreadMessages}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-cyber-dark border border-primary/30">
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Gamepad2" size={16} className="mr-2" />
              Игры
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Сообщения
              {unreadMessages > 0 && (
                <Badge className="ml-2 bg-red-500">{unreadMessages}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card className="bg-cyber-dark border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Список заказов</CardTitle>
                <CardDescription>Все заказы клиентов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-lg border border-primary/20 bg-muted/20 hover:border-primary/40 cursor-pointer transition-all"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-foreground">Заказ #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customerName} • {order.customerEmail}</p>
                        </div>
                        <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                          {order.status === 'completed' ? 'Выполнен' : 'В обработке'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                        <p className="font-bold text-primary">{order.total} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <Card className="bg-cyber-dark border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Статистика игр</CardTitle>
                <CardDescription>Продажи и выручка по играм</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {games.map((game) => (
                    <div key={game.id} className="p-4 rounded-lg border border-primary/20 bg-muted/20">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-foreground">{game.title}</h3>
                        <p className="text-primary font-bold">{game.price} ₽</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Продано копий</p>
                          <p className="text-xl font-bold text-foreground">{game.sales}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Выручка</p>
                          <p className="text-xl font-bold text-primary">{game.revenue.toLocaleString('ru-RU')} ₽</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card className="bg-cyber-dark border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Сообщения от клиентов</CardTitle>
                <CardDescription>Вопросы и обращения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-lg border ${
                        msg.read ? 'border-primary/20 bg-muted/10' : 'border-primary/40 bg-primary/5'
                      } hover:border-primary/60 cursor-pointer transition-all`}
                      onClick={() => {
                        setSelectedMessage(msg);
                        markAsRead(msg.id);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {!msg.read && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                          <div>
                            <p className="font-semibold text-foreground">{msg.name}</p>
                            <p className="text-sm text-muted-foreground">{msg.email}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                      </div>
                      <p className="text-sm text-foreground line-clamp-2">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={selectedOrder !== null} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-cyber-dark border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-primary neon-glow">
              Детали заказа #{selectedOrder?.id}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Информация о заказе
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Клиент</p>
                  <p className="font-semibold text-foreground">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Дата</p>
                  <p className="font-semibold text-foreground">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Статус</p>
                  <Badge variant={selectedOrder.status === 'completed' ? 'default' : 'secondary'}>
                    {selectedOrder.status === 'completed' ? 'Выполнен' : 'В обработке'}
                  </Badge>
                </div>
              </div>
              
              <div className="border-t border-primary/20 pt-4">
                <p className="text-sm text-muted-foreground mb-3">Товары</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="text-foreground">{item.title}</span>
                      <span className="text-primary font-semibold">{item.price} ₽</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-primary/20 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Итого:</span>
                <span className="text-2xl font-bold text-primary neon-glow">{selectedOrder.total} ₽</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={selectedMessage !== null} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="bg-cyber-dark border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-primary neon-glow">Сообщение от клиента</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Имя</p>
                  <p className="font-semibold text-foreground">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{selectedMessage.email}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Сообщение</p>
                <div className="p-4 rounded-lg bg-muted/20 border border-primary/20">
                  <p className="text-foreground">{selectedMessage.message}</p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground text-right">
                {selectedMessage.date}
              </div>
              
              <Button className="w-full neon-border bg-primary text-primary-foreground hover:bg-primary/90">
                <Icon name="Reply" size={20} className="mr-2" />
                Ответить на {selectedMessage.email}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
