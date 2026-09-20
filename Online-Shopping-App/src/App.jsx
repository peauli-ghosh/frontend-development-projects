import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Toast from './components/Toast';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import CatalogPage from './pages/CatalogPage';
import BrandsPage from './pages/BrandsPage';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
function BrandRoute(){const {brand}=useParams();return <CatalogPage mode="shop" brandParam={decodeURIComponent(brand||'')}/>}
function SearchRoute(){return <CatalogPage mode="shop"/>}
function Footer(){const navigate=useNavigate();return <footer><div className="footer-main page-width"><div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark">V</span><span><b>VIVA</b><small>SHOP SMART</small></span></Link><p>A modern marketplace demo built for the Online Shopping Cart assignment.</p><div className="socials"><span>f</span><span>◎</span><span>𝕏</span><span>▶</span></div></div><div><h4>Shop</h4><button onClick={()=>navigate('/shop')}>All products</button><button onClick={()=>navigate('/deals')}>Deals</button><button onClick={()=>navigate('/new-arrivals')}>New arrivals</button><button onClick={()=>navigate('/brands')}>Brands</button></div><div><h4>Customer care</h4><Link to="/orders">Track order</Link><Link to="/cart">Cart</Link><button onClick={()=>navigate('/shop')}>Shopping info</button><Link to="/">Help centre</Link></div><div><h4>Why VIVA</h4><button onClick={()=>navigate('/#inspiration')}>Inspiration</button><button onClick={()=>navigate('/shop')}>Rewards</button><Link to="/wishlist">Wishlist</Link></div></div><div className="footer-bottom"><div className="page-width"><span>© 2026 VIVA Shop. Academic project.</span><span>Privacy · Terms · Cookies</span><span>🇮🇳 India</span></div></div></footer>}
function ScrollManager(){
 const {pathname,hash}=useLocation();

 useEffect(()=>{
   if(hash==='#inspiration'){
     requestAnimationFrame(()=>{
       document.getElementById('inspiration')?.scrollIntoView({
         behavior:'smooth',
         block:'start'
       });
     });
   }else{
     window.scrollTo({
       top:0,
       left:0,
       behavior:'auto'
     });
   }
 },[pathname,hash]);

 return null;
}
export default function App(){return <div className="app-shell"><ScrollManager/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<CatalogPage mode="shop"/>}/><Route path="/deals" element={<CatalogPage mode="deals"/>}/><Route path="/new-arrivals" element={<CatalogPage mode="new"/>}/><Route path="/search" element={<SearchRoute/>}/><Route path="/brands" element={<BrandsPage/>}/><Route path="/brand/:brand" element={<BrandRoute/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/wishlist" element={<WishlistPage/>}/><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/orders" element={<OrdersPage/>}/></Routes><Footer/><Toast/></div>}
