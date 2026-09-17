import ProductGrid from '@/components/products/ProductGrid';

export default function ProductsPage() {
  return (
    <div className="section-pad">
      <div className="container-main">
        <ProductGrid showFilters={true} showHeading={true} />
      </div>
    </div>
  );
}
