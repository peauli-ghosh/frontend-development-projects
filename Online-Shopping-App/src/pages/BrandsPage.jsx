import { Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Leaf, Gem, Droplets, Star, Sparkles } from 'lucide-react';
import { brands } from '../data/products';
const icons=[Smartphone,Leaf,Gem,Droplets,Star,Sparkles];
export default function BrandsPage(){return <main className="page-width brands-page"><div className="page-heading"><span>SHOP BY BRAND</span><h1>Brands you know</h1><p>Explore products from popular names across fashion, technology, beauty, home and more.</p></div><div className="brand-grid brand-grid-large">{brands.map((b,i)=>{const Icon=icons[i%icons.length];return <Link key={b} to={`/brand/${encodeURIComponent(b)}`} className="brand-card"><span><Icon size={21}/></span><b>{b}</b><small>Explore collection <ChevronRight size={13}/></small></Link>})}</div></main>}
