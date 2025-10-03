import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const games = [
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

  const filteredGames = games.filter(game => {
    const matchesGenre = selectedGenre === "Все" || game.genre === selectedGenre;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const newGames = games.filter(g => g.isNew);
  const discountGames = games.filter(g => g.discount > 0);

  return (
    <div className="min-h-screen bg-cyber-darker cyber-grid">
      <header className="border-b border-primary/30 backdrop-blur-sm sticky top-0 z-50 bg-cyber-dark/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold neon-glow text-primary">CYBER GAMES</h1>
            <nav className="flex gap-6">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#new" className="text-foreground hover:text-primary transition-colors">Новинки</a>
              <a href="#sales" className="text-foreground hover:text-secondary transition-colors">Акции</a>
              <a href="#genres" className="text-foreground hover:text-primary transition-colors">Жанры</a>
            </nav>
            <Button className="neon-border bg-primary/10 hover:bg-primary/20 text-primary border-primary">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Корзина
            </Button>
          </div>
        </div>
      </header>

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

          <Tabs defaultValue="all" className="w-full">
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
                  <Card key={game.id} className="bg-card/50 border-primary/30 hover:border-primary transition-all group overflow-hidden neon-border">
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
                      <Button className="w-full mt-4 neon-border bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-primary">
                        <Icon name="ShoppingBag" size={18} className="mr-2" />
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newGames.map((game) => (
                  <Card key={game.id} className="bg-card/50 border-primary/30 hover:border-primary transition-all group overflow-hidden neon-border">
                    <div className="relative overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground neon-border animate-glow-pulse">
                        NEW
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 text-foreground">{game.title}</h3>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {game.genre}
                        </Badge>
                        <span className="text-primary font-bold text-xl">{game.price}₽</span>
                      </div>
                      <Button className="w-full mt-4 neon-border bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-primary">
                        <Icon name="ShoppingBag" size={18} className="mr-2" />
                        Купить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discountGames.map((game) => (
                  <Card key={game.id} className="bg-card/50 border-secondary/30 hover:border-secondary transition-all group overflow-hidden neon-border-secondary">
                    <div className="relative overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground neon-border-secondary animate-glow-pulse">
                        -{game.discount}%
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 text-foreground">{game.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {game.genre}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground line-through text-sm">
                          {game.price}₽
                        </span>
                        <span className="text-secondary font-bold text-2xl">
                          {Math.round(game.price * (1 - game.discount / 100))}₽
                        </span>
                      </div>
                      <Button className="w-full mt-4 neon-border-secondary bg-secondary/10 hover:bg-secondary text-secondary hover:text-secondary-foreground border-secondary">
                        <Icon name="ShoppingBag" size={18} className="mr-2" />
                        Купить со скидкой
                      </Button>
                    </CardContent>
                  </Card>
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