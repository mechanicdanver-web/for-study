import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Menu, Trash2, Ticket, CheckCircle, Clock, Gift, CreditCard, ShoppingCart } from 'lucide-react';
import { AppScreen, CartItem, UserProfile } from '../types';

interface CartScreenProps {
  onNavigate: (screen: AppScreen) => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenMenu: () => void;
  defaultBikeImage: string;
  user: UserProfile;
}

export default function CartScreen({
  onNavigate,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMenu,
  defaultBikeImage,
  user,
}: CartScreenProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'ordering' | 'completed'>('cart');
  const [orderId, setOrderId] = useState('');

  // Calculate prices
  const itemsTotal = cart.reduce((acc, curr) => acc + curr.bicycle.price * curr.quantity, 0);
  const discountAmount = Math.round(itemsTotal * (discountPercent / 100));
  const finalTotal = itemsTotal - discountAmount;

  // Apply promo code logic
  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'freeride2026') {
      setDiscountPercent(15);
      setAppliedPromo(true);
    } else {
      alert('Промокод не найден! Попробуйте "FREERIDE2026" для скидки 15%');
    }
  };

  // Perform purchase order matching
  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;
    setCheckoutStep('ordering');
    
    // Simulate payment api calls
    setTimeout(() => {
      setOrderId(`FR-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutStep('completed');
    }, 1800);
  };

  const handleResetAfterOrder = () => {
    onClearCart();
    setCheckoutStep('cart');
    onNavigate('home');
  };

  // Select the very first item to features/highlight in the upper display, if any
  const featuredItem = cart[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-full bg-brand-dark text-brand-grey px-5 py-5 font-sans justify-between max-w-md mx-auto relative rounded-[40px] shadow-lg overflow-hidden border border-brand-blue/30"
    >
      {/* 1. Header with brand italic tag and back action */}
      <div className="flex flex-col gap-1 mb-3 select-none">
        <div className="flex justify-between items-center px-1">
          <span className="text-[11px] italic font-sans font-light tracking-wide text-brand-teal">
            Free Ride
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent font-mono">
            Экстрим Клуб
          </span>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 text-white hover:text-brand-accent transition-colors font-extrabold text-lg font-display uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft size={16} className="text-brand-accent" />
            <span>Корзина</span>
          </button>
          <button
            onClick={onOpenMenu}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-blue/40 border border-brand-teal/20 text-brand-grey hover:bg-brand-blue/80 transition-all cursor-pointer shadow-sm"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {checkoutStep === 'ordering' ? (
          /* Processing Loader State */
          <motion.div
            key="ordering"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 text-white"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-brand-blue border-t-brand-accent animate-spin" />
              <CreditCard size={24} className="text-brand-accent absolute inset-0 m-auto animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-display">
              Обработка транзакции
            </h3>
            <p className="text-xs text-brand-grey max-w-xs">
              Подключаемся к платежному шлюзу. Пожалуйста, не закрывайте вкладку...
            </p>
          </motion.div>
        ) : checkoutStep === 'completed' ? (
          /* Checkout Completed State */
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col justify-between py-2 space-y-4"
          >
            <div className="text-center space-y-2 mt-2">
              <div className="mx-auto w-12 h-12 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-wider font-display pt-1">
                Заказ оформлен!
              </h3>
              <p className="text-xs text-brand-grey">
                Спасибо за покупку в клубе. Номер заказа: <strong className="font-mono text-brand-accent">{orderId}</strong>
              </p>
            </div>

            {/* Custom receipt box */}
            <div className="bg-brand-blue/30 border border-brand-teal/20 p-4 rounded-2xl space-y-3 font-mono text-[10px] text-white shadow-inner">
              <div className="flex justify-between text-brand-teal border-b border-brand-teal/10 pb-2">
                <span>ПОЛУЧАТЕЛЬ:</span>
                <span className="text-white text-right font-sans font-bold">
                  {user.firstName ? `${user.firstName} ${user.lastName}` : 'Гость Клуба'}
                </span>
              </div>
              <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-brand-grey">
                    <span className="truncate max-w-[170px] font-sans">{item.bicycle.name}</span>
                    <span>
                      {item.quantity} × {item.bicycle.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-teal/10 pt-2 flex justify-between text-brand-teal">
                <span>ИТОГОВАЯ СКИДКА:</span>
                <span className="text-brand-accent">-{discountAmount.toLocaleString('ru-RU')} ₽ ({discountPercent}%)</span>
              </div>
              <div className="border-t border-brand-teal/10 pt-2.5 flex justify-between text-sm font-extrabold text-white">
                <span>К ОПЛАТЕ:</span>
                <span className="text-brand-accent font-black font-mono text-base">{finalTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* Simulated shipment information */}
            <div className="flex gap-3 bg-brand-blue/20 p-3.5 rounded-xl border border-brand-teal/20">
              <div className="w-10 h-10 bg-brand-blue border border-brand-teal/25 rounded-lg flex items-center justify-center text-brand-teal shrink-0 shadow-md">
                <Clock size={18} className="text-brand-accent animate-pulse" />
              </div>
              <div className="flex-1 flex flex-col text-[10px] text-brand-grey leading-normal">
                <span className="font-bold text-white">ДОСТАВКА ИЛИ САМОВЫВОЗ</span>
                <span className="mt-1">
                  г. Москва, ул. Большая спортивная, д. 45. Наш менеджер позвонит вам для уточнения адреса.
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAfterOrder}
              className="w-full py-4 bg-brand-accent text-brand-dark hover:bg-white font-black uppercase tracking-widest text-xs rounded-full transition-colors cursor-pointer shadow-md"
            >
              Вернуться в главное меню
            </button>
          </motion.div>
        ) : cart.length === 0 ? (
          /* Empty Cart state */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12"
          >
            <div className="w-16 h-16 rounded-full bg-brand-blue/30 border border-brand-teal/20 flex items-center justify-center text-brand-teal shadow-md">
              <ShoppingCart size={28} />
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-display">
              Корзина пуста
            </h3>
            <p className="text-xs text-brand-grey max-w-xs">
              Выберите велосипеды и сопутствующие аксессуары в каталоге, чтобы оформить заказ или взять в аренду.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-brand-accent hover:bg-white text-brand-dark rounded-full font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              Перейти к покупкам
            </button>
          </motion.div>
        ) : (
          /* Standard Cart and featured card */
          <motion.div key="list" className="flex-1 flex flex-col justify-between space-y-4">
            {/* 2. Top featured active highlight focus item (Photo, price of bicycle, Delete Button "✕") */}
            {featuredItem && (
              <div className="bg-brand-blue/30 border border-brand-teal/20 p-4 rounded-3xl flex flex-col justify-between shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[9px] uppercase font-bold text-brand-teal tracking-wider">Фокус-товар</span>
                    <h4 className="text-sm font-black text-white truncate font-display tracking-tight mt-0.5">
                      {featuredItem.bicycle.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => onRemoveItem(featuredItem.id)}
                    className="text-brand-teal hover:text-brand-accent font-black text-base transition-colors cursor-pointer w-6 h-6 rounded-full bg-brand-dark border border-brand-teal/20 flex items-center justify-center"
                    title="Удалить"
                  >
                    ×
                  </button>
                </div>

                {/* Horizontal featured details layout */}
                <div className="flex items-center gap-4 py-2">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-2 border border-brand-teal/15 shadow-inner">
                    <img
                      src={featuredItem.bicycle.image || defaultBikeImage}
                      alt="Featured Bike"
                      referrerPolicy="no-referrer"
                      className="max-h-[64px] object-contain transition-transform"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-base font-extrabold text-brand-accent font-mono leading-none">
                      {featuredItem.bicycle.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-[9px] text-brand-grey mt-2 font-medium">
                      {featuredItem.bicycle.category === 'sale' ? 'Велосипед на продажу' : 'Прокатное оборудование'}
                    </span>
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center gap-3.5 bg-brand-dark px-3 py-1.5 rounded-full border border-brand-teal/20 w-max mt-3 select-none shadow-md">
                      <button
                        onClick={() => onUpdateQuantity(featuredItem.id, -1)}
                        className="text-xs font-bold text-brand-teal hover:text-white transition-colors cursor-pointer"
                      >
                        —
                      </button>
                      <span className="text-xs font-mono font-bold text-white min-w-[12px] text-center">
                        {featuredItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(featuredItem.id, 1)}
                        className="text-xs font-bold text-brand-teal hover:text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. "В корзине" section listing (Additional items list if any) */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-xs font-black tracking-widest uppercase text-brand-teal font-display">
                  В корзине ({cart.length})
                </span>
                <button
                  onClick={onClearCart}
                  className="text-[9px] text-brand-grey hover:text-brand-accent tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={10} />
                  <span>Очистить все</span>
                </button>
              </div>

              {/* Scrollable list of regular cart entries */}
              <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[140px] pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-brand-blue/20 p-2.5 rounded-2xl border border-brand-teal/15 hover:border-brand-accent transition-all duration-300"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-10 h-10 bg-white p-1 rounded-lg border border-brand-teal/10 flex items-center justify-center shrink-0">
                        <img
                          src={item.bicycle.image || defaultBikeImage}
                          alt={item.bicycle.name}
                          referrerPolicy="no-referrer"
                          className="max-h-[32px] object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold truncate text-white block">
                          {item.bicycle.name}
                        </span>
                        <span className="text-[10px] font-bold text-brand-accent font-mono mt-0.5 block">
                          {(item.bicycle.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>

                    {/* Inline small Quantity Selector and Delete trigger */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-2.5 py-1 bg-brand-dark border border-brand-teal/20 rounded-full select-none shadow-inner">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[10px] text-brand-teal hover:text-white cursor-pointer"
                        >
                          —
                        </button>
                        <span className="text-[10px] text-white font-mono font-bold min-w-[10px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[10px] text-brand-teal hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 bg-brand-blue/40 border border-brand-teal/20 hover:border-red-400 text-brand-teal hover:text-red-400 rounded-lg transition-all cursor-pointer"
                        title="Удалить"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code Input section */}
            <div className="bg-brand-blue/30 p-2.5 rounded-2xl border border-brand-teal/20 shadow-sm">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Промокод (FREERIDE2026)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-teal/20 rounded-xl px-3 py-2 text-[10px] text-white outline-none focus:border-brand-accent placeholder-brand-teal/50 uppercase"
                  />
                  <Ticket size={12} className="text-brand-teal/60 absolute right-3 top-2.5" />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-brand-accent hover:bg-white text-brand-dark rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer shadow-md"
                >
                  Применить
                </button>
              </div>
              {appliedPromo && (
                <span className="text-[8px] text-brand-accent font-bold block mt-1 px-1 flex items-center gap-1">
                  <Gift size={8} /> Промокод активирован: скидка 15% на все покупки!
                </span>
              )}
            </div>

            {/* Calculations & Purchase Button "Купить" */}
            <div className="pt-3 border-t border-brand-teal/15 space-y-3">
              <div className="space-y-1.5 text-xs text-brand-grey font-sans px-1">
                <div className="flex justify-between">
                  <span>Стоимость товаров</span>
                  <span className="text-white font-mono">{itemsTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-brand-teal font-bold">
                    <span>Скидка по промокоду</span>
                    <span className="font-mono text-brand-accent">-{discountAmount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-1">
                  <span>Общая сумма</span>
                  <span className="text-brand-accent font-black font-mono text-base">{finalTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutSubmit}
                className="w-full py-4 bg-brand-accent hover:bg-white text-brand-dark font-black rounded-full text-center text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
              >
                Купить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
