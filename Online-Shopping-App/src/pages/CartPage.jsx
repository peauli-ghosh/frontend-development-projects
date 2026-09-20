import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, ShieldCheck, ArrowRight, ShoppingBag, X, Truck, CheckCircle2, XCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getProductImage } from '../utils/productImage';

export default function CartPage() {
  const { state, dispatch, subtotal, discount, gst, shipping, total, cartCount, freeShippingProgress } = useShop();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [couponError, setCouponError] = useState('');
  if (!state.cart.length) return <main className="page-width empty-cart"><ShoppingBag size={64}/><h1>Your cart is empty</h1><p>Looks like you haven't added anything yet.</p><Link to="/" className="primary-btn">Start shopping <ArrowRight size={17}/></Link></main>;
  const applyCoupon = () => {
    const valid = ['VIVA10','SAVE15','WELCOME20','GREEN25'].includes(code.trim().toUpperCase());
    setCouponError(valid ? '' : 'Invalid coupon code. Try VIVA10, SAVE15, WELCOME20 or GREEN25.');
    dispatch({ type: 'APPLY_COUPON', code });
    if (valid) setCode('');
  };
  return <main className="page-width cart-page">
    <div className="cart-head"><div><span>YOUR BAG</span><h1>Shopping cart <small>{cartCount} items</small></h1></div><Link to="/">← Continue shopping</Link></div>
    <div className="shipping-progress"><Truck size={18}/><span>{shipping === 0 ? 'You unlocked free delivery!' : `Add ₹${Math.max(0, 999 - (subtotal - discount)).toLocaleString('en-IN')} more for free delivery`}</span><div><i style={{ width: `${freeShippingProgress}%` }}/></div></div>
    <div className="cart-layout"><section className="cart-items">{state.cart.map(item => <article className="cart-item" key={item.id}><img src={getProductImage(item)} alt={item.title}/><div className="cart-item-main"><span>{item.badge}</span><h3>{item.title}</h3><p>Free delivery • Easy 7-day returns</p><div className="cart-bottom"><div className="qty"><button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })} disabled={item.qty <= 1}><Minus size={15}/></button><b>{item.qty}</b><button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })} disabled={item.qty >= item.stock}><Plus size={15}/></button></div><strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong><del>₹{(item.oldPrice * item.qty).toLocaleString('en-IN')}</del></div></div><button className="remove" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}><Trash2 size={17}/><span>Remove</span></button></article>)}</section>
      <aside className="summary-card"><div className="summary-title">PRICE DETAILS <span>{cartCount} items</span></div>
        {state.coupon ? <div className="applied-coupon"><span><CheckCircle2 size={14}/> {state.coupon.code} applied ({state.coupon.percent}% off)</span><button onClick={() => dispatch({ type: 'REMOVE_COUPON' })}><X size={14}/></button></div> : <div className="coupon-wrap"><div className={`coupon ${couponError ? 'invalid' : ''}`}><Tag size={18}/><input placeholder="Coupon code" value={code} onChange={e => { setCode(e.target.value.toUpperCase()); setCouponError(''); }} onKeyDown={e => e.key === 'Enter' && applyCoupon()}/></div><button className="coupon-apply" onClick={applyCoupon}>Apply</button></div>}
        {couponError && <div className="coupon-error"><XCircle size={15}/>{couponError}</div>}
        <div className="coupon-hints">Try <button onClick={() => setCode('VIVA10')}>VIVA10</button> <button onClick={() => setCode('SAVE15')}>SAVE15</button> <button onClick={() => setCode('WELCOME20')}>WELCOME20</button> <button onClick={() => setCode('GREEN25')}>GREEN25</button></div>
        <div className="summary-lines"><div><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div><div><span>Discount</span><b className="positive">− ₹{discount.toLocaleString('en-IN')}</b></div><div><span>GST (18%)</span><b>₹{gst.toLocaleString('en-IN')}</b></div><div><span>Shipping</span><b>{shipping ? `₹${shipping}` : <span className="positive">FREE</span>}</b></div></div>
        <div className="total-line"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><button className="checkout" onClick={() => navigate('/checkout')}>Proceed to checkout <ArrowRight size={18}/></button><div className="secure-note"><ShieldCheck size={17}/> Secure checkout · Your details stay protected</div>
      </aside>
    </div><div className="cart-benefits"><span>✓ No hidden charges</span><span>✓ 7-day easy returns</span><span>✓ Multiple secure payment options</span></div>
  </main>;
}
