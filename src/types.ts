export interface Bicycle {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'sale' | 'rent' | 'repair';
  description: string;
  specs: {
    frame: string;
    wheels: string;
    weight: string;
    brakes: string;
  };
  features: string[];
  rentPricePerHour?: number;
}

export interface CartItem {
  id: string;
  bicycle: Bicycle;
  quantity: number;
}

export type AppScreen = 'promo' | 'register' | 'home' | 'cart';

export interface UserProfile {
  firstName: string;
  lastName: string;
  birthDate: string;
  isAuthenticated: boolean;
  avatarUrl?: string;
  email?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  type: 'sale' | 'rent' | 'repair';
}
