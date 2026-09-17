import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface DiscountBadgeProps {
  label: string;
  className?: string;
}

const badgeGradients: Record<string, string> = {
  '50% OFF': 'from-orange-500 to-red-500',
  '40% OFF': 'from-amber-500 to-orange-500',
  '30% OFF': 'from-yellow-500 to-amber-500',
  'HOT DEAL': 'from-red-500 to-rose-600',
  'BEST VALUE': 'from-emerald-500 to-green-600',
  'NEW': 'from-blue-500 to-indigo-600',
  'POPULAR': 'from-violet-500 to-purple-600',
  'LIMITED': 'from-pink-500 to-rose-500',
  'Up to 40% OFF': 'from-amber-500 to-orange-500',
};

export default function DiscountBadge({ label, className }: DiscountBadgeProps) {
  const gradient = badgeGradients[label] ?? 'from-orange-500 to-red-500';

  return (
    <motion.span
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: -2 }}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide text-white shadow-md animate-badge-float',
        `bg-gradient-to-r ${gradient}`,
        className
      )}
    >
      {label}
    </motion.span>
  );
}
