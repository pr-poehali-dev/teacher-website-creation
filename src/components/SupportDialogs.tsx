import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface SupportDialogsProps {
  isSupportOpen: boolean;
  setIsSupportOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  supportMessage: {
    name: string;
    email: string;
    message: string;
  };
  setSupportMessage: (data: {name: string; email: string; message: string}) => void;
  chatMessages: {text: string; isUser: boolean; time: string}[];
  setChatMessages: (messages: {text: string; isUser: boolean; time: string}[]) => void;
  chatInput: string;
  setChatInput: (input: string) => void;
  onSupportSubmit: (e: React.FormEvent) => void;
  onChatSubmit: (e: React.FormEvent) => void;
}

const SupportDialogs = ({
  isSupportOpen,
  setIsSupportOpen,
  isChatOpen,
  setIsChatOpen,
  supportMessage,
  setSupportMessage,
  chatMessages,
  setChatMessages,
  chatInput,
  setChatInput,
  onSupportSubmit,
  onChatSubmit
}: SupportDialogsProps) => {
  return (
    <>
      <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
        <DialogContent className="bg-cyber-dark border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-primary neon-glow">Обратная связь</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Напишите нам, и мы ответим на вашу почту в течение 24 часов
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={onSupportSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-foreground mb-2 block">Ваше имя</label>
              <Input
                placeholder="Иван Иванов"
                value={supportMessage.name}
                onChange={(e) => setSupportMessage({...supportMessage, name: e.target.value})}
                className="bg-muted/50 border-primary/30 text-foreground"
                required
              />
            </div>
            
            <div>
              <label className="text-sm text-foreground mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="example@cyber.net"
                value={supportMessage.email}
                onChange={(e) => setSupportMessage({...supportMessage, email: e.target.value})}
                className="bg-muted/50 border-primary/30 text-foreground"
                required
              />
            </div>
            
            <div>
              <label className="text-sm text-foreground mb-2 block">Сообщение</label>
              <textarea
                placeholder="Опишите ваш вопрос..."
                value={supportMessage.message}
                onChange={(e) => setSupportMessage({...supportMessage, message: e.target.value})}
                className="w-full min-h-[120px] px-3 py-2 rounded-md bg-muted/50 border border-primary/30 text-foreground focus:border-primary focus:outline-none resize-none"
                required
              />
            </div>
            
            <Button type="submit" className="w-full neon-border bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Send" size={20} className="mr-2" />
              Отправить
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-cyber-dark border-primary/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary neon-glow flex items-center gap-2">
              <Icon name="MessageCircle" size={24} />
              Чат поддержки
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Онлайн • Обычно отвечаем в течение 1 минуты
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="h-[400px] overflow-y-auto space-y-3 p-4 bg-muted/20 rounded-lg border border-primary/20">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isUser 
                      ? 'bg-primary text-primary-foreground neon-border' 
                      : 'bg-muted border border-primary/30 text-foreground'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={onChatSubmit} className="flex gap-2">
              <Input
                placeholder="Введите сообщение..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="bg-muted/50 border-primary/30 text-foreground"
              />
              <Button type="submit" className="neon-border bg-primary text-primary-foreground hover:bg-primary/90">
                <Icon name="Send" size={20} />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 neon-border bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg animate-glow-pulse z-50"
      >
        <Icon name="MessageCircle" size={24} />
      </Button>
    </>
  );
};

export default SupportDialogs;
