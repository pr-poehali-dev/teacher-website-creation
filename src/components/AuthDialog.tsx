import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AuthDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  authData: {
    email: string;
    password: string;
    name: string;
  };
  setAuthData: (data: {email: string; password: string; name: string}) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AuthDialog = ({
  isOpen,
  setIsOpen,
  authMode,
  setAuthMode,
  authData,
  setAuthData,
  onSubmit
}: AuthDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-cyber-dark border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-primary neon-glow">
            {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
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
  );
};

export default AuthDialog;
