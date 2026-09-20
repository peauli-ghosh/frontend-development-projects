import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
export default function WishlistPage(){ const {products,state}=useShop(); const items=products.filter(p=>state.wishlist.includes(p.id)); return <main className="page-width list-page"><div className="page-heading"><span>SAVED FOR LATER</span><h1>My wishlist <small>{items.length} products</small></h1></div>{items.length?<div className="product-grid">{items.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty-cart"><Heart size={58}/><h2>Your wishlist is waiting</h2><p>Save products you love and find them here later.</p><Link to="/" className="primary-btn"><ShoppingBag size={17}/> Explore products</Link></div>}</main> }
