import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, Sun, Moon, ChevronDown, MapPin, PackageCheck, Sparkles, Shirt, Home as HomeIcon, Droplets, Trophy, BookOpen, ShoppingBasket, Stethoscope, ChevronRight } from 'lucide-react';
import { categories, products } from '../data/products';
import { getProductImage } from '../utils/productImage';
import { useShop } from '../context/ShopContext';
const iconMap={all:Sparkles,electronics:Search,fashion:Shirt,home:HomeIcon,beauty:Droplets,sports:Trophy,books:BookOpen,grocery:ShoppingBasket,health:Stethoscope};
export default function Header(){
 const {state,cartCount,dispatch}=useShop(); const [open,setOpen]=useState(false); const [catOpen,setCatOpen]=useState(false); const [query,setQuery]=useState(''); const [focus,setFocus]=useState(false); const navigate=useNavigate(); const location=useLocation();
 const suggestions=useMemo(()=>{const q=query.trim().toLowerCase();if(!q)return[];return products.filter(p=>`${p.title} ${p.brand} ${p.category} ${p.badge}`.toLowerCase().includes(q)).slice(0,7)},[query]);
 const submit=e=>{e.preventDefault();const q=query.trim();navigate(q?`/search?q=${encodeURIComponent(q)}`:'/shop');setFocus(false);setOpen(false)};
 const nav=(url)=>{navigate(url);setOpen(false);setCatOpen(false)};
 const category=(id)=>nav(id==='all'?'/shop':`/shop?category=${encodeURIComponent(id)}`);
 const path=location.pathname;
 const active=(key)=> key==='home'?path==='/'&&!location.hash : key==='shop'?path==='/shop' : key==='deals'?path==='/deals' : key==='new'?path==='/new-arrivals' : key==='brands'?path.startsWith('/brand') : key==='inspiration'?path==='/'&&location.hash==='#inspiration' : false;
 return <>
  <div className="top-strip"><span>🚚 Free delivery on orders over ₹999</span><span>↻ 7-day easy returns</span><span>🔒 Secure payments</span><span>★ VIVA Plus members get extra rewards</span></div>
  <header className="header"><div className="header-inner">
   <button className="mobile-menu icon-btn" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
   <Link to="/" className="brand"><span className="brand-mark">V</span><span><b>VIVA</b><small>SHOP SMART</small></span></Link>
   <form className="search" onSubmit={submit} role="search"><Search size={19}/><input value={query} onFocus={()=>setFocus(true)} onChange={e=>setQuery(e.target.value)} placeholder="Search products, brands and more" aria-label="Search products"/><button type="submit">Search</button>
    {focus&&query.trim()&&<div className="search-suggestions">{suggestions.length?suggestions.map(p=><button type="button" key={p.id} onMouseDown={()=>{navigate(`/product/${p.id}`);setQuery('');setFocus(false)}}><img src={getProductImage(p)} alt=""/><span><b>{p.title}</b><small>{p.brand} · ₹{p.price.toLocaleString('en-IN')}</small></span><ChevronRight size={15}/></button>):<div className="no-suggestions">No matching products. Press Search to view results.</div>}</div>}
   </form>
   <div className="header-actions"><Link to="/wishlist" className="head-link"><Heart size={20}/><span>Wishlist</span>{state.wishlist.length>0&&<i>{state.wishlist.length}</i>}</Link><Link to="/cart" className="cart-link"><ShoppingCart size={22}/><span>Cart</span>{cartCount>0&&<i>{cartCount}</i>}</Link><button className="theme-btn icon-btn" onClick={()=>dispatch({type:'SET_THEME',theme:state.theme==='light'?'dark':'light'})} aria-label="Toggle theme">{state.theme==='light'?<Moon/>:<Sun/>}</button></div>
  </div>
  <nav className={`nav ${open?'open':''}`}><div className="nav-inner"><div className="category-wrap"><button className="category-menu" onClick={()=>setCatOpen(!catOpen)}><Menu size={17}/> All Categories <ChevronDown size={14}/></button>{catOpen&&<div className="category-dropdown">{categories.map(c=>{const Icon=iconMap[c.id]||Sparkles;return <button key={c.id} onClick={()=>category(c.id)}><span><Icon size={16}/></span>{c.name}<ChevronRight size={14}/></button>})}</div>}</div>
   <NavButton active={active('home')} onClick={()=>nav('/')}>Home</NavButton><NavButton active={active('shop')} onClick={()=>nav('/shop')}>Shop</NavButton><NavButton active={active('deals')} onClick={()=>nav('/deals')}>Deals</NavButton><NavButton active={active('new')} onClick={()=>nav('/new-arrivals')}>New Arrivals</NavButton><NavButton active={active('brands')} onClick={()=>nav('/brands')}>Brands</NavButton><NavButton active={active('inspiration')} onClick={()=>nav('/#inspiration')}>Inspiration</NavButton><Link className={path==='/orders'?'active':''} to="/orders" onClick={()=>setOpen(false)}><PackageCheck size={15}/> Track Order</Link><span className="nav-spacer"/><span className="delivery-pin"><MapPin size={16}/> Deliver to <b>700001</b></span>
  </div></nav></header></>;
}
function NavButton({children,active,onClick}){return <button className={`nav-button ${active?'active':''}`} onClick={onClick}>{children}</button>}
