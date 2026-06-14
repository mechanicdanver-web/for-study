import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserPlus, Settings, ShoppingCart, Menu, Info, Wrench, CheckCircle, Clock } from 'lucide-react';
import { AppScreen, Bicycle, UserProfile } from '../types';
import BrandLogo from './BrandLogo';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  user: UserProfile;
  bicycles: Bicycle[];
  onAddToCart: (bike: Bicycle) => void;
  cartCount: number;
  promoImage: string;
  onOpenSettings: () => void;
}

export default function HomeScreen({
  onNavigate,
  user,
  bicycles,
  onAddToCart,
  cartCount,
  promoImage,
  onOpenSettings,
}: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sale' | 'rent'>('all');
  const [selectedBikeDetails, setSelectedBikeDetails] = useState<Bicycle | null>(null);
  
  // Repair planner modal state
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [repairDevice, setRepairDevice] = useState('');
  const [repairNotes, setRepairNotes] = useState('');
  const [repairSubmitted, setRepairSubmitted] = useState(false);

  // Filter bikes based on category tabs
  const filteredBikes = bicycles.filter((bike) => {
    if (activeCategory === 'all') return true;
    return bike.category === activeCategory;
  });

  const handleRepairRequest = (e: FormEvent) => {
    e.preventDefault();
    if (!repairDevice.trim()) return;
    setRepairSubmitted(true);
    setTimeout(() => {
      setRepairSubmitted(false);
      setShowRepairModal(false);
      setRepairDevice('');
      setRepairNotes('');
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex flex-col min-h-full bg-brand-dark text-brand-grey px-5 py-5 font-sans justify-between max-w-md mx-auto relative rounded-[40px] shadow-lg overflow-hidden border border-brand-blue/30"
    >
      {/* 1. Top Bar high-level icon shortcuts - Clean Minimalism look with Requested Russian labels */}
      <div className="flex justify-between items-center bg-brand-blue/40 border border-brand-teal/20 rounded-2xl py-2 px-3 mb-4 select-none">
        <button
          onClick={() => onNavigate('register')}
          className="flex flex-col items-center gap-0.5 text-brand-grey hover:text-brand-accent transition-colors cursor-pointer"
        >
          <User size={15} className={user.isAuthenticated ? "text-brand-accent" : "text-brand-teal"} />
          <span className="text-[8px] font-bold font-sans uppercase tracking-wider">Мой профиль</span>
        </button>
        <button
          onClick={() => onNavigate('register')}
          className="flex flex-col items-center gap-0.5 text-brand-grey hover:text-brand-accent transition-colors cursor-pointer"
        >
          <UserPlus size={15} />
          <span className="text-[8px] font-bold font-sans uppercase tracking-wider">Зарегистрироваться</span>
        </button>
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center gap-0.5 text-brand-grey hover:text-brand-accent transition-colors cursor-pointer"
        >
          <Settings size={15} />
          <span className="text-[8px] font-bold font-sans uppercase tracking-wider">Настройки</span>
        </button>
        <button
          onClick={() => onNavigate('cart')}
          className="flex flex-col items-center gap-0.5 text-brand-grey hover:text-brand-accent transition-colors relative cursor-pointer"
        >
          <ShoppingCart size={15} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-brand-accent text-brand-dark text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-brand-dark">
              {cartCount}
            </span>
          )}
          <span className="text-[8px] font-bold font-sans uppercase tracking-wider">Корзина</span>
        </button>
      </div>

      {/* 2. Replacement Logo Banner */}
      <div className="flex justify-between items-center mb-4">
        <div className="cursor-pointer" onClick={() => onNavigate('promo')}>
          <BrandLogo variant="horizontal" className="scale-95 origin-left" />
        </div>
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-blue/40 border border-brand-teal/20 text-brand-grey hover:bg-brand-blue/80 transition-all cursor-pointer shadow-sm"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* 3. Slider Promo Cyclist Banner */}
      <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-4 border border-brand-teal/20 group">
        <img
          src={promoImage}
          alt="Sports Cyclist"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale brightness-90 contrast-110 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
        <div className="absolute inset-x-4 bottom-3 flex flex-col pointer-events-none">
          <span className="text-lg font-black tracking-wider uppercase font-display text-white leading-none">
            Free Ride
          </span>
          <span className="text-[8px] text-brand-teal uppercase font-bold tracking-widest mt-1">
            все о экстремальном велоспорте
          </span>
        </div>
        {/* Beautiful brand badge */}
        <div className="absolute top-3 right-3 bg-brand-accent px-2 py-1 rounded text-[8px] text-brand-dark flex items-center gap-1 font-bold">
          <span>КЛУБ</span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-pulse" />
        </div>
      </div>

      {/* 4. Three Actions Grid Cards (ПРОДАЖА, ПРОКАТ, РЕМОНТ) - Sleek Brand style */}
      <div className="grid grid-cols-3 gap-2.5 mb-4 select-none">
        {/* ПРОДАЖА - Filters to sale category */}
        <button
          onClick={() => setActiveCategory(activeCategory === 'sale' ? 'all' : 'sale')}
          className={`p-3 rounded-2xl flex flex-col justify-between items-start text-left h-24 transition-all duration-300 border ${
            activeCategory === 'sale'
              ? 'bg-brand-accent text-brand-dark border-brand-accent scale-[1.02] shadow-md'
              : 'bg-brand-blue/30 border-brand-teal/20 text-brand-grey hover:bg-brand-blue/50'
          } cursor-pointer`}
        >
          <span className="text-[11px] font-black tracking-widest font-display block">ПРОДАЖА</span>
          <span className={`text-[8px] mt-2 font-medium leading-tight ${activeCategory === 'sale' ? 'text-brand-dark/85' : 'text-brand-teal'}`}>
            купить велосипед
          </span>
        </button>

        {/* ПРОКАТ - Filters to rent category */}
        <button
          onClick={() => setActiveCategory(activeCategory === 'rent' ? 'all' : 'rent')}
          className={`p-3 rounded-2xl flex flex-col justify-between items-start text-left h-24 transition-all duration-300 border ${
            activeCategory === 'rent'
              ? 'bg-brand-accent text-brand-dark border-brand-accent scale-[1.02] shadow-md'
              : 'bg-brand-blue/30 border-brand-teal/20 text-brand-grey hover:bg-brand-blue/50'
          } cursor-pointer`}
        >
          <span className="text-[11px] font-black tracking-widest font-display block">ПРОКАТ</span>
          <span className={`text-[8px] mt-2 font-medium leading-tight ${activeCategory === 'rent' ? 'text-brand-dark/85' : 'text-brand-teal'}`}>
            аренда на день
          </span>
        </button>

        {/* РЕМОНТ - Opens interactive custom workshop booking dialog */}
        <button
          onClick={() => setShowRepairModal(true)}
          className="p-3 bg-brand-blue/30 hover:bg-brand-blue/50 border border-brand-teal/20 rounded-2xl flex flex-col justify-between items-start text-left h-24 transition-all duration-300 cursor-pointer text-brand-grey"
        >
          <span className="text-[11px] font-black tracking-widest font-display block flex items-center gap-1">
            РЕМОНТ <Wrench size={10} className="text-brand-accent" />
          </span>
          <span className="text-[8px] text-brand-teal mt-2 font-medium leading-tight">
            сервисный центр
          </span>
        </button>
      </div>

      {/* Catalog items header */}
      <div className="flex justify-between items-center mb-2.5">
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-brand-teal font-display">
          {activeCategory === 'all'
            ? 'Наш каталог'
            : activeCategory === 'sale'
            ? 'Продажа велосипедов'
            : 'Прокат велосипедов'}
        </h3>
        <span className="text-[9px] text-brand-teal font-mono bg-brand-blue/40 px-2 py-0.5 rounded-md">
          активных карточек: {filteredBikes.length}
        </span>
      </div>

      {/* 5. Interactive Bicycle Catalog List */}
      <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[190px] pr-1 mb-4 select-none">
        {filteredBikes.map((bike) => (
          <div
            key={bike.id}
            className="flex items-center gap-3 bg-brand-blue/20 border border-brand-teal/20 p-2 rounded-2xl transition-all duration-300 hover:border-brand-accent group"
          >
            {/* Bike Mini representation */}
            <div className="w-12 h-12 bg-white/10 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-brand-teal/10">
              <img
                src={bike.image}
                alt={bike.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
            </div>

            {/* Title & Metadata details */}
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[11px] font-extrabold text-white truncate font-sans tracking-wide">
                {bike.name}
              </span>
              <span className="text-[10px] font-bold text-brand-accent font-mono mt-0.5">
                {bike.category === 'sale'
                  ? `${bike.price.toLocaleString('ru-RU')} ₽`
                  : `${bike.rentPricePerHour} ₽ / час`}
              </span>
              <span className="text-[8px] text-brand-teal mt-0.5 uppercase tracking-wider bg-brand-dark/80 px-1.5 py-0.5 rounded w-max font-bold border border-brand-teal/10">
                {bike.category === 'sale' ? 'Продажа' : 'Прокат'}
              </span>
            </div>

            {/* Quick action triggers */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedBikeDetails(bike)}
                className="w-8 h-8 rounded-full bg-brand-dark text-brand-teal hover:text-white flex items-center justify-center border border-brand-teal/20 transition-all cursor-pointer shadow-sm"
                title="Подробнее"
              >
                <Info size={12} />
              </button>
              <button
                onClick={() => onAddToCart(bike)}
                className="w-8 h-8 rounded-full bg-brand-accent text-brand-dark hover:bg-white hover:text-brand-dark flex items-center justify-center transition-all cursor-pointer shadow-sm text-xs font-black"
                title="Добавить в корзину"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Dynamic Account Login State Button at Bottom */}
      <div className="mt-auto pt-1">
        {user.isAuthenticated ? (
          <div className="flex items-center justify-between p-3 bg-brand-blue/30 border border-brand-teal/20 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-xs font-mono font-medium text-brand-grey">
                Кабинет: {user.firstName}
              </span>
            </div>
            <button
              onClick={() => onNavigate('register')}
              className="text-[9px] text-brand-accent uppercase font-black hover:underline cursor-pointer"
            >
              Изменить
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('register')}
            className="w-full py-3 bg-brand-accent hover:bg-white text-brand-dark font-black uppercase tracking-widest text-[10px] rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Войти в личный кабинет</span>
          </button>
        )}
      </div>

      {/* RETAIL DETAILED MODAL BIKE VIEWER - Brand themed */}
      <AnimatePresence>
        {selectedBikeDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md z-30 flex items-end justify-center"
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              className="bg-brand-dark w-full max-h-[92%] rounded-t-[32px] border-t border-brand-teal/40 p-6 flex flex-col justify-between shadow-2xl text-white"
            >
              {/* Top Handle Close */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest text-brand-accent uppercase font-black">Спецификация</span>
                <button
                  onClick={() => setSelectedBikeDetails(null)}
                  className="w-8 h-8 rounded-full bg-brand-blue border border-brand-teal/30 flex items-center justify-center text-brand-teal hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Product Visual */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="w-full aspect-[4/3] bg-white rounded-2xl flex items-center justify-center relative p-4 border border-brand-teal/20">
                  <img
                    src={selectedBikeDetails.image}
                    alt={selectedBikeDetails.name}
                    className="max-h-[160px] object-contain transition-all duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-brand-accent text-brand-dark text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    {selectedBikeDetails.category === 'sale' ? 'Продажа' : 'Прокат'}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold font-display text-white">{selectedBikeDetails.name}</h4>
                  <p className="text-xs text-brand-grey mt-1 leading-relaxed">
                    {selectedBikeDetails.description}
                  </p>
                </div>

                {/* Specs block grid */}
                <div className="grid grid-cols-2 gap-2 bg-brand-blue/30 p-3 rounded-xl border border-brand-teal/20">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase text-brand-teal font-sans font-bold">Рама</span>
                    <span className="text-xs font-semibold text-white">{selectedBikeDetails.specs.frame}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase text-brand-teal font-sans font-bold">Колеса</span>
                    <span className="text-xs font-semibold text-white">{selectedBikeDetails.specs.wheels}</span>
                  </div>
                  <div className="flex flex-col pt-1.5">
                    <span className="text-[8px] uppercase text-brand-teal font-sans font-bold">Вес</span>
                    <span className="text-xs font-semibold text-white">{selectedBikeDetails.specs.weight}</span>
                  </div>
                  <div className="flex flex-col pt-1.5">
                    <span className="text-[8px] uppercase text-brand-teal font-sans font-bold">Тормоза</span>
                    <span className="text-xs font-semibold text-white">{selectedBikeDetails.specs.brakes}</span>
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[9px] font-black tracking-wider uppercase text-brand-teal font-mono">Особенности:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedBikeDetails.features.map((feat, i) => (
                      <span key={i} className="text-[9px] bg-brand-blue text-brand-sand px-2 py-0.5 rounded font-medium border border-brand-teal/20">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Options */}
              <div className="pt-4 border-t border-brand-teal/20 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-teal font-sans">Стоимость</span>
                  <span className="text-base font-black font-mono text-brand-accent">
                    {selectedBikeDetails.category === 'sale'
                      ? `${selectedBikeDetails.price.toLocaleString('ru-RU')} ₽`
                      : `${selectedBikeDetails.rentPricePerHour} ₽ / час`}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(selectedBikeDetails);
                    setSelectedBikeDetails(null);
                  }}
                  className="px-6 py-3 bg-brand-accent text-brand-dark hover:bg-white rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  Купить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. WORKSHOP REPAIR SCHEDULER DIALOG - Brand themed */}
      <AnimatePresence>
        {showRepairModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md z-40 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-brand-dark border border-brand-teal/30 rounded-3xl p-5 w-full max-w-sm flex flex-col justify-between shadow-2xl text-white"
            >
              <div className="flex justify-between items-center mb-4 border-b border-brand-teal/20 pb-2">
                <span className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-1.5 font-display">
                  <Wrench size={14} className="text-brand-accent" /> ЗАПИСЬ НА РЕМОНТ
                </span>
                <button
                  onClick={() => setShowRepairModal(false)}
                  className="text-brand-teal hover:text-white font-bold"
                >
                  ✕
                </button>
              </div>

              {repairSubmitted ? (
                <div className="py-6 flex flex-col items-center text-center space-y-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, 0] }}
                    className="w-12 h-12 rounded-full bg-brand-accent text-brand-dark flex items-center justify-center"
                  >
                    <CheckCircle size={24} />
                  </motion.div>
                  <h4 className="text-base font-bold text-white">Заявка отправлена!</h4>
                  <p className="text-xs text-brand-grey">
                    Мастер свяжется с вами в течение 10 минут для подтверждения времени.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRepairRequest} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-brand-teal uppercase font-bold tracking-wider block">
                      Модель велосипеда
                    </label>
                    <input
                      type="text"
                      placeholder="BMX Haro / Cannondale Trail 5..."
                      value={repairDevice}
                      onChange={(e) => setRepairDevice(e.target.value)}
                      className="w-full bg-brand-blue/30 border border-brand-teal/20 rounded-xl p-2.5 outline-none text-xs text-white placeholder-brand-grey focus:border-brand-accent transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-brand-teal uppercase font-bold tracking-wider block">
                      Что нужно отремонтировать / Описание проблемы
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Люфт руля, замена цепи, настройка тормозов..."
                      value={repairNotes}
                      onChange={(e) => setRepairNotes(e.target.value)}
                      className="w-full bg-brand-blue/30 border border-brand-teal/20 rounded-xl p-2.5 outline-none text-xs text-white placeholder-brand-grey focus:border-brand-accent transition-all"
                    />
                  </div>

                  <div className="flex gap-2 items-center text-[9px] text-brand-teal">
                    <Clock size={12} className="text-brand-accent" />
                    <span>Среднее время диагностики: 15 минут</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-accent hover:bg-white text-brand-dark font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Отправить заявку мастеру
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
