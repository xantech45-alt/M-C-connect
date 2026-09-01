import {
  Shirt,
  Tv,
  Wrench,
  Package,
  Laptop,
  Factory,
  Home,
  Phone,
  Sparkles,
  Car,
} from 'lucide-react';

export type IconName =
  | 'shirt'
  | 'tv'
  | 'wrench'
  | 'package'
  | 'laptop'
  | 'factory'
  | 'home'
  | 'phone'
  | 'sparkles'
  | 'car';

const ICONS: Record<IconName, typeof Shirt> = {
  shirt: Shirt,
  tv: Tv,
  wrench: Wrench,
  package: Package,
  laptop: Laptop,
  factory: Factory,
  home: Home,
  phone: Phone,
  sparkles: Sparkles,
  car: Car,
};

interface Props {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

/**
 * Map a stable category icon name to a lucide component. Lets the catalog
 * store names (serializable, language-neutral) while the UI renders the icon.
 */
export function IconRender({ name, size = 24, strokeWidth = 1.5 }: Props) {
  const Component = ICONS[name] ?? Package;
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}