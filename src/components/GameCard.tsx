import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface GameCardProps {
  game: Game;
  onAddToCart: (game: Game) => void;
}

const GameCard = ({ game, onAddToCart }: GameCardProps) => (
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

export default GameCard;
