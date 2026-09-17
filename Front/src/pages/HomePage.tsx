import Hero from '@/components/home/Hero';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedDeals from '@/components/home/FeaturedDeals';
import HowItWorks from '@/components/home/HowItWorks';
import TrustSection from '@/components/home/TrustSection';
import PaymentSection from '@/components/home/PaymentSection';
import FAQAccordion from '@/components/home/FAQAccordion';
import ProductGrid from '@/components/products/ProductGrid';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnnouncementBar />
      <CategoryGrid />
      <FeaturedDeals />
      <section className="section-pad bg-gray-50">
        <div className="container-main">
          <ProductGrid showFilters={true} showHeading={true} />
        </div>
      </section>
      <HowItWorks />
      <TrustSection />
      <PaymentSection />
      <FAQAccordion />
      <WhatsAppCTA />
    </>
  );
}
