import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FooterProps {
  setIsSupportOpen: (open: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
}

const Footer = ({ setIsSupportOpen, setIsChatOpen }: FooterProps) => {
  return (
    <footer className="border-t border-primary/30 mt-20 py-8 bg-cyber-dark/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-primary font-bold mb-3 neon-glow">CYBER GAMES</h3>
            <p className="text-muted-foreground text-sm">Магазин игр будущего</p>
          </div>
          <div>
            <h4 className="text-foreground font-bold mb-3">Контакты</h4>
            <p className="text-muted-foreground text-sm mb-2">
              <Icon name="Mail" size={16} className="inline mr-2" />
              support@cybergames.net
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsSupportOpen(true)}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Icon name="Send" size={16} className="mr-2" />
              Написать нам
            </Button>
          </div>
          <div>
            <h4 className="text-foreground font-bold mb-3">Поддержка</h4>
            <p className="text-muted-foreground text-sm mb-2">Онлайн 24/7</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsChatOpen(true)}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Открыть чат
            </Button>
          </div>
        </div>
        <div className="text-center pt-6 border-t border-primary/30">
          <p className="text-muted-foreground text-sm">
            © 2084 CYBER GAMES. Все права защищены в цифровом пространстве.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
