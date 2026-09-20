import React, { useEffect } from 'react';
import { ArrowRight, Clock3, ShieldCheck, Truck, RotateCcw, Sparkles, Smartphone, Gem, ChevronRight, Leaf, Star, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories, brands } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
const inspiration=[
 {title:'Everyday fashion',tag:'STYLE EDIT',copy:'Easy layers & essentials',category:'fashion',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85'},
 {title:'Calm spaces',tag:'HOME EDIT',copy:'Pieces that feel at home',category:'home',image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85'},
 {title:'Move better',tag:'MOVE EDIT',copy:'Training & active gear',category:'sports',image:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85'}
];
export default function Home(){
 const {products}=useShop(); const navigate=useNavigate();
 useEffect(()=>{if(location.hash==='#inspiration')document.getElementById('inspiration')?.scrollIntoView({behavior:'smooth'})},[]);
 const featured=products.slice(0,10);
 const category=(id)=>navigate(id==='all'?'/shop':`/shop?category=${id}`);
 return <main>
  <section className="hero-wrap page-width" id="home"><div className="hero hero-image"><div className="hero-overlay"/><div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> Curated for everyday life</span><h1>Elevate Your<br/><em>Everyday</em></h1><p>Discover quality products across every category — made for the way you live.</p><div className="hero-actions"><button className="primary-btn" onClick={()=>navigate('/shop')}>Shop now <ArrowRight size={18}/></button><button className="ghost-btn" onClick={()=>navigate('/cart')}>View Cart</button></div><div className="hero-trust"><span>☆ Premium quality</span><span>◇ Great prices</span><span>♧ Trusted by 10K+ customers</span></div></div><div className="hero-sale"><b>SUMMER<br/>SALE</b><span>UP TO</span><strong>40%</strong><small>OFF</small></div></div></section>
  <section className="category-strip page-width">{categories.map(c=><button key={c.id} onClick={()=>category(c.id)}><span>{c.icon}</span><b>{c.name}</b></button>)}</section>
  <section className="page-width" id="products"><SectionTitle eyebrow="HANDPICKED FOR YOU" title="Top picks for you" action="Shop all" onAction={()=>navigate('/shop')}/><div className="product-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  <section className="feature-banners page-width" id="highlights">
   <button className="feature-banner green" onClick={()=>navigate('/new-arrivals')}><span>NEW ARRIVALS</span><h3>Fresh styles<br/>just in.</h3><b>Shop new arrivals <ArrowRight size={15}/></b><div className="banner-visual">👜</div></button>
   <button className="feature-banner sand" onClick={()=>navigate('/shop?category=home')}><span>HOME REFRESH</span><h3>Make your<br/>space better.</h3><b>Explore home <ArrowRight size={15}/></b><div className="banner-visual">🪑</div></button>
   <button className="feature-banner blue" onClick={()=>navigate('/shop?category=electronics')}><span>TECH ESSENTIALS</span><h3>Upgrade your<br/>lifestyle.</h3><b>Shop tech <ArrowRight size={15}/></b><div className="banner-visual">⌚</div></button>
  </section>
  <section className="marketplace-band page-width"><div><Clock3 size={25}/><div><b>Flash deals end soon</b><span>Fresh discounts at 50% off or more</span></div></div><Countdown/><button className="primary-btn" onClick={()=>navigate('/deals')}>Explore deals <ArrowRight size={16}/></button></section>
  <section className="brands-section page-width" id="brands"><SectionTitle eyebrow="SHOP BY BRAND" title="Brands you know" action="View all brands" onAction={()=>navigate('/brands')}/><div className="brand-grid">{brands.slice(0,6).map((b,i)=>{const Icon=[Smartphone,Leaf,Gem,Droplets,Star,Sparkles][i];return <button key={b} onClick={()=>navigate(`/brand/${encodeURIComponent(b)}`)}><span><Icon size={20}/></span><b>{b}</b><small>Explore collection <ChevronRight size={13}/></small></button>})}</div></section>
  <section className="inspiration-section page-width" id="inspiration"><div className="inspiration-copy"><span>VIVA INSPIRATION</span><h2>Build a better everyday.</h2><p>Explore curated edits for travel, style, self-care and home. Every collection is designed to make browsing feel effortless.</p><button className="primary-btn" onClick={()=>navigate('/new-arrivals')}>Explore the edit <ArrowRight size={16}/></button></div><div className="inspiration-cards">{inspiration.map(item=><button key={item.title} style={{backgroundImage:`linear-gradient(180deg,rgba(5,30,24,.04),rgba(5,30,24,.78)),url(${item.image})`}} onClick={()=>navigate(`/shop?category=${item.category}`)}><span>{item.tag}</span><b>{item.title}</b><small>{item.copy}</small></button>)}</div></section>
  <section className="trust-row page-width"><div><Truck/><b>Free shipping</b><span>On orders over ₹999</span></div><div><RotateCcw/><b>Easy returns</b><span>7-day return window</span></div><div><ShieldCheck/><b>Secure payments</b><span>Protected checkout</span></div><div><Sparkles/><b>VIVA Rewards</b><span>Earn points as you shop</span></div></section>
 </main>;
}
function Countdown(){const [seconds,setSeconds]=React.useState(2*3600+18*60+42);React.useEffect(()=>{const id=setInterval(()=>setSeconds(s=>s<=0?2*3600+18*60+42:s-1),1000);return()=>clearInterval(id)},[]);const h=Math.floor(seconds/3600),m=Math.floor((seconds%3600)/60),s=seconds%60;return <div className="timer"><b>{String(h).padStart(2,'0')}</b><i>:</i><b>{String(m).padStart(2,'0')}</b><i>:</i><b>{String(s).padStart(2,'0')}</b></div>}
