import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface PaymentDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  paymentData: {
    cardNumber: string;
    cardName: string;
    expiry: string;
    cvv: string;
  };
  setPaymentData: (data: {cardNumber: string; cardName: string; expiry: string; cvv: string}) => void;
  getTotalPrice: () => number;
  onSubmit: (e: React.FormEvent) => void;
}

const PaymentDialog = ({
  isOpen,
  setIsOpen,
  paymentData,
  setPaymentData,
  getTotalPrice,
  onSubmit
}: PaymentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-cyber-dark border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-primary neon-glow">Оплата заказа</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Сумма к оплате: <span className="text-primary font-bold">{getTotalPrice()}₽</span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
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
  );
};

export default PaymentDialog;
