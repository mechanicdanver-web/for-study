import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Settings, ShoppingCart, User, Smartphone, Layout, LogOut, CheckCircle, RefreshCw, X } from 'lucide-react';

// Types
import { AppScreen, Bicycle, CartItem, UserProfile } from './types';

// Components
import PromoScreen from './components/PromoScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import CartScreen from './components/CartScreen';
import BrandLogo from './components/BrandLogo';

// Image assets (referencing generated paths and high-quality bike templates)
const CYCLIST_HERO_IMAGE = '/src/assets/images/cyclist_orange_duotone_1781411732800.jpg';
const BMX_PRODUCT_IMAGE = '/src/assets/images/bmx_bike_orange_1781411751620.jpg';
const STAR_BIKE_IMAGE = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400';
const SCOTT_BIKE_IMAGE = 'https://images.unsplash.com/photo-1544192240-4a34feb0104c?auto=format&fit=crop&q=80&w=400';

// Global mock bicycle array
const AVAILABLE_BICYCLES: Bicycle[] = [
  {
    id: 'bmx-haro-2021',
    name: 'BMX Haro Midway Freecoaster (2021)',
    price: 39700,
    image: BMX_PRODUCT_IMAGE,
    category: 'sale',
    description: 'Премиальный BMX велосипед нового поколения с надежной втулкой фрикостер, хромомолибденовой рамой и прочными ободами для экстремального катания в парке и стрите.',
    specs: {
      frame: 'Full Cro-Mo 21.0"',
      wheels: 'Haro Sata Double Wall 20"',
      weight: '11.6 кг',
      brakes: 'Haro alloy U-brake',
    },
    features: ['Фрикостер втулка', 'Усиленные дропауты', 'Комбо-седло', 'Грипсы Haro Team'],
  },
  {
    id: 'star-48',
    name: 'Bicycle Star 48',
    price: 45600,
    image: STAR_BIKE_IMAGE,
    category: 'sale',
    description: 'Элегантный и надежный городской велосипед в ретро-стиле с планетарной втулкой и передней корзиной для комфортных прогулок.',
    specs: {
      frame: 'Alloy Comfort Low-Step',
      wheels: 'Double-wall Alloy 28"',
      weight: '13.4 кг',
      brakes: 'Promax V-Brake / Coaster',
    },
    features: ['Планетарные передачи Shimona', 'Передняя стальная корзина', 'Мягкое пружинное седло', 'Полноразмерные крылья'],
  },
  {
    id: 'scott-scale',
    name: 'Scott Scale 970 (2023)',
    price: 89000,
    image: SCOTT_BIKE_IMAGE,
    category: 'sale',
    description: 'Спортивный горный кросс-кантрийный хардтейл с алюминиевой рамой прогрессивной геометрии, воздушной вилкой и 12-скоростной трансмиссией SRAM SX Eagle.',
    specs: {
      frame: 'Scale Alloy 6061 Custom Butted',
      wheels: 'Syncros X-20 29"',
      weight: '12.8 кг',
      brakes: 'Shimano MT200 Hydraulic Disc',
    },
    features: ['Вилка RockShox Judy Silver TK Air', 'SRAM SX Eagle 12 скоростей', 'Покрышки Maxxis Rekon Race', 'Блокировка вилки на руле'],
  },
  {
    id: 'rent-town',
    name: 'Comfort Cruiser Townie',
    price: 12000,
    rentPricePerHour: 350,
    image: 'https://images.unsplash.com/photo-1576435465679-6447378903c1?auto=format&fit=crop&q=80&w=400',
    category: 'rent',
    description: 'Супер-комфортный прогулочный велосипед с заниженной рамой и технологией Flat Foot, позволяющей ставить ноги на землю всей стопой.',
    specs: {
      frame: '6061-T6 Aluminum step-thru',
      wheels: 'Anodized Alloy 26"',
      weight: '14.1 кг',
      brakes: 'Linear-Pull Alloy V-brakes',
    },
    features: ['Технология Flat Foot', 'Анатомическое седло гелевое', 'Широкие покрышки 2.15"', '7 передач Shimano Tourney'],
  },
  {
    id: 'rent-mountain',
    name: 'Active Trail Mountain Bike',
    price: 18000,
    rentPricePerHour: 500,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=400',
    category: 'rent',
    description: 'Горный велосипед начального уровня с амортизационной вилкой Suntour, дисковыми гидравлическими тормозами и грязевым протектором для катания в лесу.',
    specs: {
      frame: 'ALUXX-Grade Aluminum Frame',
      wheels: 'Giant Double Wall 29"',
      weight: '13.9 кг',
      brakes: 'Tektro HD-M275 Disc',
    },
    features: ['Вилка SR Suntour XCE 100мм', 'Трансмиссия Shimano 2x8', 'Грязевые шины Maxxis', 'Спортивное седло Trail'],
  },
];

export default function App() {
  // Navigation active screen
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('promo');

  // Control side drawer panel
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Global user state
  const [user, setUser] = useState<UserProfile>({
    firstName: 'Иван',
    lastName: 'Иванович',
    birthDate: '12.04.1995',
    isAuthenticated: true,
  });

  // Pre-seed Cart State to match Screen 4 in screenshots out-of-the-box!
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      bicycle: AVAILABLE_BICYCLES[0], // BMX Haro Midway
      quantity: 1,
    },
    {
      id: 'cart-2',
      bicycle: AVAILABLE_BICYCLES[1], // Bicycle Star 48
      quantity: 1,
    },
  ]);

  // Add item handler
  const handleAddToCart = (bike: Bicycle) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.bicycle.id === bike.id);
      if (existing) {
        return prevCart.map((item) =>
          item.bicycle.id === bike.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: `cart-${Date.now()}`, bicycle: bike, quantity: 1 }];
    });
  };

  // Modify quantities
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Delete item from cart
  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Update profile
  const handleUpdateUser = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#121212] flex flex-col md:flex-row items-center justify-center p-0 md:p-8 select-none">
      {/* 2. Desktop helper panel (Sidebar) - Clean Minimalism styling */}
      <div className="hidden md:flex flex-col max-w-sm mr-8 bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-sm self-start sticky top-8 space-y-5">
        <div className="flex flex-col items-center text-center border-b border-[#E5E7EB] pb-4">
          <BrandLogo variant="text-only" className="scale-90" />
          <span className="text-xs text-[#6B7280] font-medium font-sans mt-2">
            Панель управления макетом
          </span>
        </div>

        {/* Dynamic Screen Quick Buttons */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#121212] tracking-wider block mb-1">
            Переключение Экранов:
          </span>
          <button
            onClick={() => setCurrentScreen('promo')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
              currentScreen === 'promo'
                ? 'bg-black text-white font-extrabold font-sans'
                : 'bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]'
            } cursor-pointer`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              1. Экран-Заставка / Промо
            </span>
            <Layout size={12} />
          </button>

          <button
            onClick={() => setCurrentScreen('register')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
              currentScreen === 'register'
                ? 'bg-black text-white font-extrabold font-sans'
                : 'bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]'
            } cursor-pointer`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              2. Экран-Регистрация
            </span>
            <User size={12} />
          </button>

          <button
            onClick={() => setCurrentScreen('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
              currentScreen === 'home'
                ? 'bg-black text-white font-extrabold font-sans'
                : 'bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]'
            } cursor-pointer`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              3. Главный Экран / Каталог
            </span>
            <Settings size={12} />
          </button>

          <button
            onClick={() => setCurrentScreen('cart')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
              currentScreen === 'cart'
                ? 'bg-black text-white font-extrabold font-sans'
                : 'bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]'
            } cursor-pointer`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              4. Экран Корзины
            </span>
            <div className="flex items-center gap-1">
              <ShoppingCart size={12} />
              {cartTotalCount > 0 && (
                <span className="bg-white text-black text-[9px] font-bold px-1.5 rounded-full border border-black/10">
                  {cartTotalCount}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Interactive mock control actions */}
        <div className="pt-3 border-t border-[#E5E7EB] space-y-2 text-[11px] text-[#6B7280]">
          <div className="flex justify-between items-center bg-[#F9FAFB] p-2.5 rounded-xl border border-[#E5E7EB]">
            <span>Профиль активен:</span>
            <span className="font-bold text-black font-sans">
              {user.isAuthenticated ? '✓ Иван И.' : '✕ Гость'}
            </span>
          </div>

          <button
            onClick={() => {
              setCart([
                { id: 'cart-1', bicycle: AVAILABLE_BICYCLES[0], quantity: 1 },
                { id: 'cart-2', bicycle: AVAILABLE_BICYCLES[1], quantity: 1 },
              ]);
              setCurrentScreen('cart');
            }}
            className="w-full py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-sans text-center hover:bg-[#F3F4F6] text-black flex items-center justify-center gap-1 cursor-pointer font-semibold"
          >
            <RefreshCw size={10} />
            <span>Сбросить корзину к макету 4</span>
          </button>
        </div>

        {/* SVG vertical graphic representation showcase */}
        <div className="flex justify-center pt-3 border-t border-[#E5E7EB]">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-bold mb-2">Новый Логотип бренда:</span>
            {/* Monochromatic representation of brand logo */}
            <BrandLogo variant="full" className="scale-[0.8] origin-center -my-8" />
          </div>
        </div>
      </div>

      {/* 3. Main Phone Emulator Stage container - Clean Minimalism styling */}
      <div className="w-full md:w-[412px] h-screen md:h-[840px] relative bg-white flex flex-col md:rounded-[48px] overflow-hidden md:shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:border-[10px] md:border-black">
        
        {/* Dynamic Display Screens */}
        <div className="flex-1 overflow-hidden relative min-h-0">
          <AnimatePresence mode="wait">
            {currentScreen === 'promo' && (
              <motion.div
                key="promo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <PromoScreen
                  onNavigate={setCurrentScreen}
                  onOpenMenu={() => setIsMenuOpen(true)}
                  heroImage={CYCLIST_HERO_IMAGE}
                />
              </motion.div>
            )}
            {currentScreen === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <RegisterScreen
                  onNavigate={setCurrentScreen}
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  cartCount={cartTotalCount}
                />
              </motion.div>
            )}
            {currentScreen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <HomeScreen
                  onNavigate={setCurrentScreen}
                  user={user}
                  bicycles={AVAILABLE_BICYCLES}
                  onAddToCart={handleAddToCart}
                  cartCount={cartTotalCount}
                  promoImage={CYCLIST_HERO_IMAGE}
                  onOpenSettings={() => setIsMenuOpen(true)}
                />
              </motion.div>
            )}
            {currentScreen === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <CartScreen
                  onNavigate={setCurrentScreen}
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                  onOpenMenu={() => setIsMenuOpen(true)}
                  defaultBikeImage={BMX_PRODUCT_IMAGE}
                  user={user}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Interactive Bottom bar indicator inside simulated phone */}
        <div className="hidden md:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full" />
      </div>

      {/* UI Menu Selector Drawer Overlay - Clean Minimalism styling */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="bg-white w-[280px] h-full p-6 flex flex-col justify-between border-l border-[#E5E7EB] text-black"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
                  <span className="text-xs font-black tracking-widest text-black font-display">НАВИГАЦИЯ</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-neutral-100 border border-[#E5E7EB] flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Vertical Links list inside simulated phone drawer */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setCurrentScreen('promo');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-sans hover:bg-black hover:text-white transition-colors uppercase font-semibold text-neutral-800 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>Посадочный экран</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentScreen('register');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-sans hover:bg-black hover:text-white transition-colors uppercase font-semibold text-neutral-800 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>Регистрация</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentScreen('home');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-sans hover:bg-black hover:text-white transition-colors uppercase font-semibold text-neutral-800 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>Каталог товаров</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentScreen('cart');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-sans hover:bg-black hover:text-white transition-colors uppercase font-semibold text-neutral-800 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>Корзина ({cartTotalCount})</span>
                  </button>
                </div>
              </div>

              {/* Reset user button inside drawing panel */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    handleUpdateUser({
                      firstName: '',
                      lastName: '',
                      birthDate: '',
                      isAuthenticated: false,
                    });
                    setIsMenuOpen(false);
                    setCurrentScreen('register');
                  }}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut size={12} />
                  <span>Выйти из кабинета</span>
                </button>
                <p className="text-[10px] text-gray-400 text-center font-mono">
                  FREE RIDE MINIMAL V.2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
