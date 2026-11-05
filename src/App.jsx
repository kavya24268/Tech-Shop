
import { useState } from 'react';
import './App.css';
import productsData from './data/productsData.js';
import { categoryMenu } from './data/filterBarData.js';

function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

function ProductCard({ product }) {
  const image = product.images?.[0];

  return (
    <article className="product-card">
      <a className="product-image" href={product.path}>
        {image && (
          <img src={image} alt={product.title} />
        )}
      </a>

      <div className="product-info">
        <p className="product-rating">
          <span>★★★★★</span>
        </p>

        <h3>{product.title}</h3>
        <p className="product-description">{product.info}</p>

        <div className="product-prices">
          <strong>{formatPrice(product.finalPrice)}</strong>
          <del>{formatPrice(product.originalPrice)}</del>
        </div>

        <button
          className="add-cart-button"
          onClick={() => alert(`${product.title} selected`)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All');

  const heroProducts = productsData.filter(
    (product) => product.tag === 'hero-product'
  );

  const featuredProducts = productsData.filter(
    (product) => product.tag === 'featured-product'
  );

  const visibleProducts =
    activeCategory === 'All'
      ? productsData
      : productsData.filter(
          (product) => product.category === activeCategory
        );

  const hero = heroProducts[0];

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="/">
          Tech-Shop
        </a>

        <div className="header-actions">
          <button aria-label="Search">⌕</button>
          <button aria-label="Shopping cart">🛒</button>
          <button aria-label="Account">♙</button>
        </div>
      </header>

      <main>
        {hero && (
          <section className="hero">
            <div className="hero-content">
              <p>{hero.title}</p>
              <h1>{hero.tagline}</h1>

              <div className="product-prices hero-prices">
                <strong>{formatPrice(hero.finalPrice)}</strong>
                <del>{formatPrice(hero.originalPrice)}</del>
              </div>

              <a className="shop-button" href="#products">
                Shop Now
              </a>
            </div>

            <img
              className="hero-image"
              src={hero.heroImage}
              alt={hero.title}
            />
          </section>
        )}

        <div className="carousel-dots" aria-label="Featured slides">
          <span className="active-dot" />
          <span />
          <span />
        </div>

        <section className="featured-section">
          <h2>Featured Products</h2>

          <div className="featured-products">
            {featuredProducts.slice(0, 5).map((product) => (
              <div className="featured-item" key={product.id}>
                <p>{product.title}</p>
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                />
                <div className="product-prices">
                  <strong>{formatPrice(product.finalPrice)}</strong>
                  <del>{formatPrice(product.originalPrice)}</del>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-dots">
            <span />
            <span />
            <span />
            <span />
            <span className="active-dot" />
          </div>
        </section>

        <section className="products-section" id="products">
          <h2>Top Products</h2>

          <div className="category-tabs">
            <button
              className={activeCategory === 'All' ? 'active' : ''}
              onClick={() => setActiveCategory('All')}
            >
              All
            </button>

            {categoryMenu.map((category) => (
              <button
                key={category.id}
                className={
                  activeCategory === category.label ? 'active' : ''
                }
                onClick={() => setActiveCategory(category.label)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.slice(0, 11).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            <a className="browse-card" href="#products">
              Browse All Products →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
