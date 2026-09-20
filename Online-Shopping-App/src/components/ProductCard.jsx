import { Heart, ShoppingCart, Eye, Star, Zap, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getProductImage } from '../utils/productImage';

export default function ProductCard({ product, compact = false }) {
  const { state, dispatch } = useShop();
  const navigate = useNavigate();

  const liked = state.wishlist.includes(product.id);
  const cartItem = state.cart.find(item => item.id === product.id);
  const qty = cartItem?.qty || 0;

  const discount = Math.max(
    0,
    Math.round((1 - product.price / product.oldPrice) * 100)
  );

  const image = getProductImage(product);

  const view = () => {
    dispatch({
      type: 'ADD_RECENT',
      id: product.id
    });

    navigate(`/product/${product.id}`);
  };

  const add = () => {
    dispatch({
      type: 'ADD_TO_CART',
      product
    });
  };

  return (
    <article className="product-card">

      <div
        className="product-media"
        onClick={view}
        role="button"
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === 'Enter') view();
        }}
      >
        <span className="discount-pill">
          -{discount}%
        </span>

        <button
          className={`wish-btn ${liked ? 'liked' : ''}`}
          aria-label="Wishlist"
          onClick={event => {
            event.stopPropagation();

            dispatch({
              type: 'TOGGLE_WISHLIST',
              id: product.id
            });
          }}
        >
          <Heart
            size={18}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>

        <img
          src={image}
          alt={product.title}
          loading="lazy"
        />

        {!compact && (
          <button
            className="quick-view"
            onClick={event => {
              event.stopPropagation();
              view();
            }}
          >
            <Eye size={15} />
            Quick view
          </button>
        )}
      </div>

      <div className="product-info">

        <span className="product-badge">
          {product.badge}
        </span>

        <h3 onClick={view}>
          {product.title}
        </h3>

        <div className="product-brand">
          {product.brand}
        </div>

        <div className="rating-row">
          <span className="rating">
            <Star
              size={12}
              fill="currentColor"
            />
            {product.rating}
          </span>

          <span>
            ({product.reviews.toLocaleString('en-IN')})
          </span>
        </div>

        <div className="price-row">
          <strong>
            ₹{product.price.toLocaleString('en-IN')}
          </strong>

          <del>
            ₹{product.oldPrice.toLocaleString('en-IN')}
          </del>
        </div>

        <p className="delivery">
          ✓ Free delivery • {product.delivery}
        </p>

        {product.stock <= 8 && (
          <p className="low-stock">
            <Zap size={13} />
            Only {product.stock} left
          </p>
        )}

        {qty > 0 ? (

          <div className="cart-stepper">

            <div className="cart-added-label">
              <ShoppingCart size={15} />
              <span>Added to Cart</span>
            </div>

            <div className="cart-qty-controls">

              <button
                onClick={event => {
                  event.stopPropagation();

                  dispatch({
                    type: 'DECREMENT_CART',
                    id: product.id
                  });
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>

              <b>{qty}</b>

              <button
                onClick={event => {
                  event.stopPropagation();
                  add();
                }}
                disabled={qty >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>

            </div>

          </div>

        ) : (

          <button
            className="add-btn"
            onClick={add}
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>

        )}

      </div>
    </article>
  );
}
