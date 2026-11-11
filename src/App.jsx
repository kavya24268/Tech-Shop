import { useEffect, useState } from 'react';
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from 'react-icons/fi';

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
          <img
            src={image}
            alt={product.title}
          />
        )}
      </a>

      <div className="product-info">

        <p className="product-rating">
          <span>★★★★★</span>
        </p>

        <h3>{product.title}</h3>

        <p className="product-description">
          {product.info}
        </p>

        <div className="product-prices">

          <strong>
            {formatPrice(product.finalPrice)}
          </strong>

          <del>
            {formatPrice(product.originalPrice)}
          </del>

        </div>

        <button
          className="add-cart-button"
          onClick={() =>
            alert(`${product.title} selected`)
          }
        >
          Add to cart
        </button>

      </div>
    </article>
  );
}

function EmptyCart({ onStartShopping }) {
  return (
    <section className="empty-cart">

      <div className="empty-cart-content">

        <div className="empty-cart-icon">
          <FiShoppingCart />

          <span className="empty-cart-x">
            <FiX />
          </span>
        </div>

        <h1>
          Your Cart is Empty
        </h1>

        <button
          className="start-shopping-button"
          onClick={onStartShopping}
        >
          Start Shopping
        </button>

      </div>

    </section>
  );
}

function App() {
  const [activeCategory, setActiveCategory] =
    useState('All');

  const [showSearch, setShowSearch] =
    useState(false);

  const [showCart, setShowCart] =
    useState(false);

  const [featuredIndex, setFeaturedIndex] =
    useState(0);

  const heroProducts =
    productsData.filter(
      (product) =>
        product.tag === 'hero-product'
    );

  const featuredProducts =
    productsData.filter(
      (product) =>
        product.tag === 'featured-product'
    );

  const visibleProducts =
    activeCategory === 'All'
      ? productsData
      : productsData.filter(
          (product) =>
            product.category === activeCategory
        );

  const hero = heroProducts[0];

  const featuredCarouselProducts = [
    ...featuredProducts,
    ...featuredProducts,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((current) => {
        if (
          current ===
          featuredProducts.length
        ) {
          return 1;
        }

        return current + 1;
      });
    }, 3000);

    return () =>
      clearInterval(interval);
  }, [featuredProducts.length]);

  function handleSearchClick() {
    setShowSearch(!showSearch);
    setShowCart(false);
  }

  function handleCartClick() {
    setShowCart(true);
    setShowSearch(false);
  }

  function handleStartShopping() {
    setShowCart(false);
  }

  return (
    <div className="app">

      {showSearch && (
        <div
          className="search-overlay"
          onClick={() =>
            setShowSearch(false)
          }
        />
      )}

      <header className="header">

        <a
          className="logo"
          href="/"
          onClick={() =>
            setShowCart(false)
          }
        >
          Tech-Shop
        </a>

        <div className="header-actions">

          <button
            className="header-icon"
            aria-label="Search"
            onClick={
              handleSearchClick
            }
          >
            <FiSearch />

            <span className="tooltip">
              Search
            </span>
          </button>

          <button
            className="header-icon"
            aria-label="Shopping cart"
            onClick={
              handleCartClick
            }
          >
            <FiShoppingCart />

            <span className="tooltip">
              Cart
            </span>
          </button>

          <button
            className="header-icon"
            aria-label="Account"
          >
            <FiUser />

            <span className="tooltip">
              Account
            </span>
          </button>

        </div>

      </header>

      {showSearch && (
        <div className="search-popup">

          <input
            type="text"
            placeholder="Search for product..."
            autoFocus
          />

        </div>
      )}

      {showCart ? (

        <EmptyCart
          onStartShopping={
            handleStartShopping
          }
        />

      ) : (

        <main>

          {hero && (
            <section className="hero">

              <div className="hero-content">

                <p>
                  {hero.title}
                </p>

                <h1>
                  {hero.tagline}
                </h1>

                <div className="product-prices hero-prices">

                  <strong>
                    {formatPrice(
                      hero.finalPrice
                    )}
                  </strong>

                  <del>
                    {formatPrice(
                      hero.originalPrice
                    )}
                  </del>

                </div>

                <a
                  className="shop-button"
                  href="#products"
                >
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

          <div
            className="carousel-dots"
            aria-label="Featured slides"
          >
            <span className="active-dot" />
            <span />
            <span />
          </div>

          {/* FEATURED PRODUCTS */}

          <section className="featured-section">

            <h2>
              Featured Products
            </h2>

            <div className="featured-slider">

              <div
                className="featured-track"
                style={{
                  transform:
                    `translateX(-${
                      featuredIndex * 20
                    }%)`,
                }}
              >

                {featuredCarouselProducts.map(
                  (product, index) => (

                    <div
                      className="featured-item"
                      key={`${product.id}-${index}`}
                    >

                      <p>
                        {product.title}
                      </p>

                      <img
                        src={
                          product.images?.[0]
                        }
                        alt={
                          product.title
                        }
                      />

                      <div className="product-prices">

                        <strong>
                          {formatPrice(
                            product.finalPrice
                          )}
                        </strong>

                        <del>
                          {formatPrice(
                            product.originalPrice
                          )}
                        </del>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            <div className="carousel-dots">

              {featuredProducts.map(
                (_, index) => (

                  <span
                    key={index}
                    className={
                      index ===
                      featuredIndex %
                        featuredProducts.length
                        ? 'active-dot'
                        : ''
                    }
                  />

                )
              )}

            </div>

          </section>

          {/* TOP PRODUCTS */}

          <section
            className="products-section"
            id="products"
          >

            <h2>
              Top Products
            </h2>

            <div className="category-tabs">

              <button
                className={
                  activeCategory === 'All'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setActiveCategory(
                    'All'
                  )
                }
              >
                All
              </button>

              {categoryMenu.map(
                (category) => (

                  <button
                    key={category.id}
                    className={
                      activeCategory ===
                      category.label
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      setActiveCategory(
                        category.label
                      )
                    }
                  >
                    {category.label}
                  </button>

                )
              )}

            </div>

            <div className="product-grid">

              {visibleProducts
                .slice(0, 11)
                .map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                ))}

              <a
                className="browse-card"
                href="#products"
              >
                Browse All Products →
              </a>

            </div>

          </section>

        </main>

      )}

    </div>
  );
}

export default App;