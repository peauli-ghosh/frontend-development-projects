import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, MapPin, CheckCircle2, ArrowLeft, Pencil, Save, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const blankAddress = { name:'', phone:'', line1:'', city:'', state:'', pincode:'' };

export default function CheckoutPage(){
  const { state, total, subtotal, discount, gst, shipping, dispatch } = useShop();
  const navigate = useNavigate();
  const [method,setMethod]=useState('UPI');
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(state.address || blankAddress);
  const [placed,setPlaced]=useState(null);

  if(!state.cart.length && !placed) return <div className="empty-page"><h2>Your cart is empty</h2><Link to="/">Return to shop</Link></div>;

  if(placed) return <main className="page-width success-page">
    <CheckCircle2 size={72}/><h1>Order placed successfully!</h1><p>Your demo order <strong>#{placed.id}</strong> has been confirmed.</p>
    <div className="success-card"><b>₹{placed.total.toLocaleString('en-IN')}</b><span>Payment method: {placed.paymentMethod}</span><span>Expected delivery: 2–4 business days</span><span>{placed.items.length} item{placed.items.length > 1 ? 's' : ''} ordered</span></div>
    <div className="success-actions"><Link to="/orders" className="primary-btn">Track order</Link><Link to="/" className="ghost-btn">Continue shopping</Link></div>
  </main>;

  const saveAddress=()=>{ if(!draft.name || !draft.phone || !draft.line1 || !draft.city || !draft.state || !draft.pincode) return; dispatch({type:'SET_ADDRESS',address:draft}); setEditing(false); };
  const placeOrder=()=>{
    const order={
      id:`VIVA${Math.floor(10000+Math.random()*90000)}`,
      placedAt:new Date().toISOString(), status:'Placed', paymentMethod:method,
      address:state.address, items:state.cart.map(i=>({id:i.id,title:i.title,image:i.image,price:i.price,qty:i.qty,brand:i.brand})),
      subtotal, discount, gst, shipping, total
    };
    dispatch({type:'ADD_ORDER',order}); dispatch({type:'CLEAR_CART'}); setPlaced(order);
  };
  return <main className="page-width checkout-page"><Link to="/cart" className="back-link"><ArrowLeft size={16}/> Back to cart</Link><div className="checkout-layout"><section>
    <div className="checkout-step"><h2><span>1</span> Delivery address</h2>{editing ? <div className="address-form">
      {Object.entries({name:'Full name',phone:'Phone number',line1:'Address',city:'City',state:'State',pincode:'PIN code'}).map(([key,label])=><label key={key}>{label}<input value={draft[key]||''} onChange={e=>setDraft({...draft,[key]:e.target.value})}/></label>)}
      <div className="address-form-actions"><button className="ghost-btn" onClick={()=>setEditing(false)}><X size={15}/> Cancel</button><button className="primary-btn" onClick={saveAddress}><Save size={15}/> Save address</button></div>
    </div> : <div className="address-card"><MapPin/><div><b>{state.address.name || 'Home'}</b><p>{state.address.line1}, {state.address.city}, {state.address.state} — {state.address.pincode}</p><small>Phone: {state.address.phone}</small></div><button onClick={()=>{setDraft(state.address);setEditing(true)}}><Pencil size={13}/> Edit</button></div>}</div>
    <div className="checkout-step"><h2><span>2</span> Payment method</h2><div className="payment-options">{['UPI','Card','Cash on Delivery'].map(m=><label className={method===m?'active':''} key={m}><input type="radio" name="method" checked={method===m} onChange={()=>setMethod(m)}/><CreditCard size={19}/><span>{m}</span></label>)}</div></div>
  </section><aside className="summary-card"><div className="summary-title">ORDER SUMMARY <span>{state.cart.reduce((a,i)=>a+i.qty,0)} items</span></div><div className="checkout-mini">{state.cart.map(i=><div key={i.id}><span>{i.title} × {i.qty}</span><b>₹{(i.price*i.qty).toLocaleString('en-IN')}</b></div>)}</div><div className="summary-lines compact-summary"><div><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div><div><span>Discount</span><b className="positive">− ₹{discount.toLocaleString('en-IN')}</b></div><div><span>GST</span><b>₹{gst.toLocaleString('en-IN')}</b></div><div><span>Shipping</span><b>{shipping ? `₹${shipping}` : <span className="positive">FREE</span>}</b></div></div><div className="total-line"><span>Payable</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><button className="checkout" onClick={placeOrder}>Place order <ShieldCheck size={17}/></button><p className="secure-note">Demo checkout — no real payment is processed.</p></aside></div></main>
}
