import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { products, coupons } from '../data/products';

const ShopContext = createContext(null);
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)); } catch { return fallback; } };
const defaultAddress = { name:'Peauli Ghosh', phone:'98XXXXXX21', line1:'24 Lake View Road', city:'Kolkata', state:'West Bengal', pincode:'700001' };
const initialState = {
  cart: read('viva-cart', []), wishlist: read('viva-wishlist', []), coupon: read('viva-coupon', null), theme: localStorage.getItem('viva-theme') || 'light',
  toast:null, recentlyViewed:read('viva-recent', []), orders:read('viva-orders', []), address:read('viva-address', defaultAddress) || defaultAddress
};
const makeToast = (message, type='success') => ({message,type});
function reducer(state, action) {
  switch(action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i=>i.id===action.product.id);
      const cart = existing ? state.cart.map(i=>i.id===action.product.id ? {...i, qty:Math.min(i.qty+1,i.stock)}:i) : [...state.cart,{...action.product,qty:1}];
      return {...state,cart,toast:makeToast('Added to Cart')};
    }
    case 'DECREMENT_CART': {
      const cart = state.cart.flatMap(i => i.id===action.id ? (i.qty>1 ? [{...i,qty:i.qty-1}] : []) : [i]);
      return {...state,cart,toast:makeToast(cart.some(i=>i.id===action.id)?'Cart updated':'Item removed from cart')};
    }
    case 'REMOVE_FROM_CART': return {...state,cart:state.cart.filter(i=>i.id!==action.id),toast:makeToast('Item removed from cart')};
    case 'UPDATE_QTY': return {...state,cart:state.cart.map(i=>i.id===action.id?{...i,qty:Math.max(1,Math.min(action.qty,i.stock))}:i)};
    case 'CLEAR_CART': return {...state,cart:[],coupon:null};
    case 'TOGGLE_WISHLIST': { const exists=state.wishlist.includes(action.id); return {...state,wishlist:exists?state.wishlist.filter(id=>id!==action.id):[...state.wishlist,action.id],toast:makeToast(exists?'Removed from wishlist':'Saved to wishlist')}; }
    case 'APPLY_COUPON': { const code=action.code.trim().toUpperCase(); if(!coupons[code]) return {...state,toast:makeToast('Invalid coupon. Try VIVA10, SAVE15, WELCOME20 or GREEN25.','error')}; return {...state,coupon:{code,percent:coupons[code]},toast:makeToast(`${code} applied — ${coupons[code]}% off`)}; }
    case 'REMOVE_COUPON': return {...state,coupon:null,toast:makeToast('Coupon removed')};
    case 'SET_THEME': return {...state,theme:action.theme};
    case 'ADD_RECENT': return {...state,recentlyViewed:[action.id,...state.recentlyViewed.filter(id=>id!==action.id)].slice(0,8)};
    case 'SET_ADDRESS': return {...state,address:action.address,toast:makeToast('Delivery address updated')};
    case 'ADD_ORDER': return {...state,orders:[action.order,...state.orders],toast:makeToast('Order placed successfully')};
    case 'CANCEL_ORDER': return {...state,orders:state.orders.map(o=>o.id===action.id?{...o,status:'Cancelled',cancellationReason:action.reason,cancelledAt:new Date().toISOString()}:o),toast:makeToast('Order cancelled')};
    case 'CLEAR_TOAST': return {...state,toast:null};
    default: return state;
  }
}
export function ShopProvider({children}) {
  const [state,dispatch]=useReducer(reducer,initialState);
  useEffect(()=>localStorage.setItem('viva-cart',JSON.stringify(state.cart)),[state.cart]);
  useEffect(()=>localStorage.setItem('viva-wishlist',JSON.stringify(state.wishlist)),[state.wishlist]);
  useEffect(()=>localStorage.setItem('viva-coupon',JSON.stringify(state.coupon)),[state.coupon]);
  useEffect(()=>localStorage.setItem('viva-theme',state.theme),[state.theme]);
  useEffect(()=>localStorage.setItem('viva-recent',JSON.stringify(state.recentlyViewed)),[state.recentlyViewed]);
  useEffect(()=>localStorage.setItem('viva-orders',JSON.stringify(state.orders)),[state.orders]);
  useEffect(()=>localStorage.setItem('viva-address',JSON.stringify(state.address)),[state.address]);
  useEffect(()=>document.documentElement.setAttribute('data-theme',state.theme),[state.theme]);
  useEffect(()=>{if(!state.toast)return;const t=setTimeout(()=>dispatch({type:'CLEAR_TOAST'}),2600);return()=>clearTimeout(t)},[state.toast]);
  const value=useMemo(()=>{
    const subtotal=state.cart.reduce((s,i)=>s+i.price*i.qty,0);
    const discount=state.coupon?Math.round(subtotal*state.coupon.percent/100):0;
    const taxable=Math.max(0,subtotal-discount), gst=Math.round(taxable*.18), shipping=taxable===0||taxable>=999?0:49, total=taxable+gst+shipping;
    const cartCount=state.cart.reduce((s,i)=>s+i.qty,0);
    return {state,dispatch,products,subtotal,discount,gst,shipping,total,cartCount,freeShippingProgress:Math.min(100,Math.round(taxable/999*100))};
  },[state]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export const useShop=()=>useContext(ShopContext);
