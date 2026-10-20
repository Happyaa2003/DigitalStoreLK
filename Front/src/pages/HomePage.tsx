import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedDeals from '@/components/home/FeaturedDeals';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDeals />
      <WhatsAppCTA />
    </>
  );
}
