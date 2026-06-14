import { motion } from 'motion/react';
import { X, Sparkles, Percent, Wrench, ArrowRight } from 'lucide-react';
import { AppScreen } from '../types';

interface PromoScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onOpenMenu: () => void;
  heroImage: string;
}

export default function PromoScreen({ onNavigate, heroImage }: PromoScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-full bg-brand-dark text-brand-grey px-6 py-6 font-sans select-none justify-between max-w-md mx-auto relative rounded-[40px] shadow-lg overflow-hidden border border-brand-blue/30"
    >
      {/* 1. Top Bar with the requested icon «крестик» (close button returning to LK) */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent px-3 py-1 rounded-full bg-brand-blue/60 font-mono border border-brand-teal/20">
          Скидки & Акции
        </span>

        {/* Close Button "Крестик" to navigate back to LK (Personal account / register screen) */}
        <button
          onClick={() => onNavigate('register')}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-teal/30 text-brand-grey bg-brand-blue/50 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
          title="Вернуться в личный кабинет"
        >
          <X size={16} />
        </button>
      </div>

      {/* 2. Brand Hero Headline */}
      <div className="my-4 z-10">
        <div className="flex items-center gap-1 mb-1">
          <Sparkles className="text-brand-accent animate-pulse" size={12} />
          <span className="font-mono text-[9px] text-brand-teal uppercase tracking-[0.2em] font-bold">
            СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
          </span>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-black font-display tracking-tight leading-none uppercase text-white"
        >
          ВЫГОДНЫЙ СТАРТ
          <span className="block text-brand-accent text-lg font-bold font-sans mt-0.5 normal-case tracking-normal">
            для новых участников клуба!
          </span>
        </motion.h1>
      </div>

      {/* 3. Cyclist Image Card with subtle gradient overlay */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-brand-teal/20 bg-brand-blue/20"
      >
        <img
          src={heroImage}
          alt="Cyclist extreme"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 bg-brand-accent text-brand-dark text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-black">
          FREE RIDE CLUB
        </div>
      </motion.div>

      {/* 4. Mandatory Text Sections: "акция на первый прокат...", "акция на первый ремонт..." */}
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {/* Прокат Promo Card */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="p-3.5 bg-brand-blue/30 rounded-2xl border border-brand-teal/20 hover:border-brand-accent transition-all duration-300 flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
            <Percent size={16} />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">ПЕРВЫЙ ПРОКАТ — БЕСПЛАТНО</h4>
            <p className="text-[10px] text-brand-grey mt-1 leading-relaxed">
              Эксклюзивная <span className="text-brand-accent font-semibold">акция на первый прокат велосипеда</span>: получите первые 2 часа бесплатно при активации аккаунта в приложении.
            </p>
          </div>
        </motion.div>

        {/* Ремонт Promo Card */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-3.5 bg-brand-blue/30 rounded-2xl border border-brand-teal/20 hover:border-brand-accent transition-all duration-300 flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
            <Wrench size={16} />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">СКИДКА НА СЕРВИС -50%</h4>
            <p className="text-[10px] text-brand-grey mt-1 leading-relaxed">
              Выгодная <span className="text-brand-accent font-semibold">акция на первый ремонт велосипеда</span>: скидка 50% на профессиональную диагностику, регулировку трансмиссии и смазку компонентов.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 5. Navigation Control Buttons */}
      <div className="space-y-2 mt-4">
        {/* View Catalog Button */}
        <motion.button
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          onClick={() => onNavigate('home')}
          className="w-full py-3 bg-brand-accent hover:bg-white text-brand-dark font-black rounded-full text-center transition-all duration-300 text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
        >
          <span>Перейти в каталог</span>
          <ArrowRight size={12} />
        </motion.button>

        {/* Secondary Return Button explicitly calling 'register' */}
        <button
          onClick={() => onNavigate('register')}
          className="w-full py-2.5 text-[9px] text-brand-teal hover:text-white uppercase font-bold tracking-wider hover:underline transition-all cursor-pointer text-center"
        >
          Личный кабинет
        </button>
      </div>

      {/* Slide pagination indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        <span className="w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
        <span className="w-6 h-1.5 bg-brand-accent rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
      </div>
    </motion.div>
  );
}
