import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserPlus, Settings, ShoppingCart, Lock, Eye, EyeOff, Calendar, UserCheck, RefreshCw } from 'lucide-react';
import { AppScreen, UserProfile } from '../types';
import BrandLogo from './BrandLogo';

interface RegisterScreenProps {
  onNavigate: (screen: AppScreen) => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  cartCount: number;
}

export default function RegisterScreen({
  onNavigate,
  user,
  onUpdateUser,
  cartCount,
}: RegisterScreenProps) {
  // Local input states initialized with global user state
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [birthDate, setBirthDate] = useState(user.birthDate || '');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onUpdateUser({
        firstName,
        lastName,
        birthDate: birthDate || '13.06.2000',
        isAuthenticated: true,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      });
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onNavigate('home');
      }, 1500);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-full bg-brand-dark text-brand-grey px-6 pt-5 pb-4 font-sans justify-between max-w-md mx-auto relative rounded-[40px] shadow-lg overflow-hidden border border-brand-blue/30"
    >
      {/* 1. TOP BAR with requested icons: «Мой профиль», «Зарегистрироваться», «Настройки», «Корзина» */}
      <div className="flex justify-between items-center bg-brand-blue/40 border border-brand-teal/20 rounded-2xl py-2 px-3 mb-4 select-none">
        <button
          onClick={() => onNavigate('register')}
          className="flex flex-col items-center gap-0.5 text-brand-grey hover:text-brand-accent transition-colors cursor-pointer"
        >
          <User size={15} className="text-brand-accent" />
          <span className="text-[8px] font-bold font-sans uppercase tracking-wider">Мой профиль</span>
        </button>
        <button
          onClick={() => onNavigate('register')}
          className="flex flex-col items-center gap-0.5 text-brand-grey hover:text-brand-accent transition-colors cursor-pointer"
        >
          <UserPlus size={15} className="text-brand-accent" />
          <span className="text-[8px] font-bold font-sans uppercase tracking-wider text-brand-accent">Зарегистрироваться</span>
        </button>
        <button
          onClick={() => onNavigate('home')} // Return home/settings
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

      {/* Brand logo at top */}
      <div className="flex justify-center my-3 overflow-hidden py-1 items-center">
        <BrandLogo variant="compact" className="scale-95 origin-center" />
      </div>

      {/* Register Title */}
      <div className="text-center my-1.5">
        <h2 className="text-lg font-black font-display uppercase tracking-widest text-white">
          Регистрация
        </h2>
        <p className="text-[10px] text-brand-teal mt-0.5">
          {user.isAuthenticated
            ? 'Профиль активен и авторизован в системе'
            : 'Получите доступ к привилегиям Free Ride'}
        </p>
      </div>

      {/* Interactive Registration Form with requested inputs: Имя, Фамилия, Дата рождения, Пароль */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center space-y-4.5 px-3 my-2">
        {/* Имя Input */}
        <div className="relative border-b border-brand-teal/20 focus-within:border-brand-accent transition-colors duration-300 pb-1.5">
          <label className="block text-[8px] uppercase font-bold text-brand-teal tracking-wider mb-1">
            Имя
          </label>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Иван"
              className="bg-transparent text-sm w-full outline-none text-white font-sans placeholder-brand-grey py-0.5"
              required
            />
            <User size={14} className="text-brand-teal/60" />
          </div>
        </div>

        {/* Фамилия Input */}
        <div className="relative border-b border-brand-teal/20 focus-within:border-brand-accent transition-colors duration-300 pb-1.5">
          <label className="block text-[8px] uppercase font-bold text-brand-teal tracking-wider mb-1">
            Фамилия
          </label>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Иванов"
              className="bg-transparent text-sm w-full outline-none text-white font-sans placeholder-brand-grey py-0.5"
              required
            />
            <User size={14} className="text-brand-teal/60" />
          </div>
        </div>

        {/* Дата рождения Input */}
        <div className="relative border-b border-brand-teal/20 focus-within:border-brand-accent transition-colors duration-300 pb-1.5">
          <label className="block text-[8px] uppercase font-bold text-brand-teal tracking-wider mb-1">
            Дата рождения
          </label>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="12.04.1995"
              className="bg-transparent text-sm w-full outline-none text-white font-sans placeholder-brand-grey py-0.5"
            />
            <Calendar size={14} className="text-brand-teal/60" />
          </div>
        </div>

        {/* Пароль Input */}
        <div className="relative border-b border-brand-teal/20 focus-within:border-brand-accent transition-colors duration-300 pb-1.5">
          <label className="block text-[8px] uppercase font-bold text-brand-teal tracking-wider mb-1">
            Пароль
          </label>
          <div className="flex items-center justify-between">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-white font-sans placeholder-brand-grey py-0.5 tracking-widest"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-brand-teal/60 hover:text-brand-accent transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || successMessage}
            className="w-full py-3.5 bg-brand-accent hover:bg-white rounded-full text-center text-xs font-black uppercase tracking-widest text-brand-dark shadow-md active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <RefreshCw className="animate-spin text-brand-dark" size={14} />
            ) : successMessage ? (
              <UserCheck size={14} className="text-brand-dark" />
            ) : null}
            <span>
              {isSubmitting
                ? 'Регистрация...'
                : successMessage
                ? 'Успешный вход!'
                : 'Зарегистрироваться'}
            </span>
          </button>
        </div>
      </form>

      {/* Sign up confirmation modal overlay */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-6 top-1/3 bg-brand-dark border-2 border-brand-accent p-5 rounded-3xl flex flex-col items-center gap-2 text-center shadow-2xl z-20"
          >
            <span className="w-10 h-10 rounded-full bg-brand-accent text-brand-dark flex items-center justify-center text-lg font-bold">
              ✓
            </span>
            <span className="font-semibold text-white">Добро пожаловать, {firstName}!</span>
            <span className="text-xs text-brand-teal">Перенаправляем в личный каталог...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styled Interactive bottom navigation tab-bar */}
      <div className="flex justify-around items-center border-t border-brand-teal/20 pt-3 mt-auto relative bg-brand-blue/35 -mx-6 px-6">
        <button
          type="button"
          onClick={() => onNavigate('register')}
          className="flex flex-col items-center justify-center gap-1 group py-1"
        >
          <User size={18} className="text-brand-accent font-black transition-colors duration-300 scale-110" />
          <span className="text-[9px] text-brand-accent tracking-wide font-black">Профиль</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center justify-center gap-1 group py-1"
        >
          <Settings size={18} className="text-brand-teal group-hover:text-white transition-colors duration-300" />
          <span className="text-[9px] text-[#E1E1E1] group-hover:text-white tracking-wide font-medium">Каталог</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('cart')}
          className="flex flex-col items-center justify-center gap-1 group py-1 relative"
        >
          <ShoppingCart size={18} className="text-brand-teal group-hover:text-white transition-colors duration-300" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-brand-accent text-brand-dark text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              {cartCount}
            </span>
          )}
          <span className="text-[9px] text-[#E1E1E1] group-hover:text-white tracking-wide font-medium">Корзина</span>
        </button>
      </div>
    </motion.div>
  );
}
