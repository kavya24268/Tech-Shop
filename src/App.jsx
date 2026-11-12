import { useEffect, useState } from 'react';
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from 'react-icons/fi';


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

function LoginModal({ onClose, onSignup }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="modal-overlay">

      <div className="auth-modal">

        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2>Login</h2>

        <p className="auth-switch">
          New to Tech-Shop?{' '}
          <button onClick={onSignup}>
            Create an account
          </button>
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="auth-submit"
          >
            Login
          </button>

        </form>

        <div className="social-divider">
          <span></span>
          <p>or login with</p>
          <span></span>
        </div>

        <div className="social-buttons">

          <button className="facebook-button">
            Facebook
          </button>

          <button className="google-button">
            Google
          </button>

          <button className="twitter-button">
            Twitter
          </button>

        </div>

      </div>

    </div>
  );
}

function SignupModal({ onClose, onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="modal-overlay">

      <div className="auth-modal signup-modal">

        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2>Signup</h2>

        <p className="auth-switch">
          Already have an account?{' '}
          <button onClick={onLogin}>
            Login
          </button>
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            required
          />

          <input
            type="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
          />

          <button
            type="submit"
            className="auth-submit"
          >
            Signup
          </button>

        </form>

        <div className="social-divider">
          <span></span>
          <p>or login with</p>
          <span></span>
        </div>

        <div className="social-buttons">

          <button className="facebook-button">
            Facebook
          </button>

          <button className="google-button">
            Google
          </button>

          <button className="twitter-button">
            Twitter
          </button>

        </div>

      </div>

    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All');

  const [heroIndex, setHeroIndex] = useState(0);
  const [heroTransition, setHeroTransition] = useState(true);

  const [accountOpen, setAccountOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [featuredIndex, setFeaturedIndex] = useState(0);

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

  const heroSlides = [
    ...heroProducts,
    ...heroProducts,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((previous) => previous + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleHeroTransitionEnd = () => {
    if (heroIndex >= heroProducts.length) {
      setHeroTransition(false);
      setHeroIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeroTransition(true);
        });
      });
    }
  };

  const openLogin = () => {
    setAccountOpen(false);
    setAuthMode('login');
  };

  const openSignup = () => {
    setAccountOpen(false);
    setAuthMode('signup');
  };

  const closeAuth = () => {
    setAuthMode(null);
  };

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


      {/* =========================
          HEADER
      ========================= */}

      <header className="header">

        <a className="logo" href="/">
          Tech-Shop
        </a>

        <div className="header-actions">

          {/* SEARCH */}

          <div className="header-action-wrapper">

            <button
              className="nav-action-button"
              aria-label="Search"
            >
              <FiSearch className="nav-icon" />

              <span className="nav-action-label">
                Search
              </span>
            </button>

          </div>

          {/* CART */}

          <div className="header-action-wrapper">

            <button
              className="nav-action-button"
              aria-label="Shopping cart"
            >
              <FiShoppingCart className="nav-icon" />

              <span className="nav-action-label">
                Cart
              </span>

              <span className="cart-count">
                0
              </span>
            </button>

          </div>

          {/* ACCOUNT */}

          <div className="account-wrapper">

            <button
              className={`account-button ${
                accountOpen ? 'account-active' : ''
              }`}
              aria-label="Account"
              onClick={() =>
                setAccountOpen((previous) => !previous)
              }
            >
              <FiUser className="nav-icon" />
            </button>

            {accountOpen && (
              <div className="account-dropdown">

                <h3>
                  Hello!
                </h3>

                <p>
                  Access account and manage orders
                </p>

                <button
                  className="login-button"
                  onClick={openLogin}
                >
                  Login / Signup
                </button>

                <div className="dropdown-divider" />

                <p className="please-login">
                  Please Login
                </p>

              </div>
            )}

          </div>

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