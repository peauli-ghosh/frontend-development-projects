import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, SearchX, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { brands, categories } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function CatalogPage({mode='shop', brandParam=''}){
 const {products}=useShop(); const [params]=useSearchParams();
 const initialCategory=params.get('category')||'all', q=params.get('q')||'';
 const [category,setCategory]=useState(initialCategory); const [brand,setBrand]=useState(brandParam||'all'); const [rating,setRating]=useState('0'); const [deal,setDeal]=useState(false); const [sort,setSort]=useState('featured'); const [mobile,setMobile]=useState(false); const [max,setMax]=useState('');
 const title=mode==='deals'?'Great deals — 50% off or more':mode==='new'?'New arrivals':'Shop all products';
 const list=useMemo(()=>{
   let out=products.filter(p=>category==='all'||p.category===category);
   if(brand!=='all') out=out.filter(p=>p.brand===brand);
   if(q) out=out.filter(p=>`${p.title} ${p.brand} ${p.category} ${p.badge}`.toLowerCase().includes(q.toLowerCase()));
   if(mode==='deals'||deal) out=out.filter(p=>Math.round((1-p.price/p.oldPrice)*100)>=50);
   if(mode==='new') out=out.filter(p=>p.badge.toLowerCase().includes('new')||p.id<=12||p.id%11===0);
   if(Number(rating)>0) out=out.filter(p=>p.rating>=Number(rating));
   if(max) out=out.filter(p=>p.price<=Number(max));
   if(sort==='price-low') out.sort((a,b)=>a.price-b.price); if(sort==='price-high') out.sort((a,b)=>b.price-a.price); if(sort==='rating') out.sort((a,b)=>b.rating-a.rating); if(sort==='discount') out.sort((a,b)=>((1-b.price/b.oldPrice)-(1-a.price/a.oldPrice)));
   return out;
 },[products,category,brand,rating,deal,sort,max,q,mode]);
 const clear=()=>{setCategory('all');setBrand('all');setRating('0');setDeal(false);setMax('');setSort('featured')};
 return <main className="catalog-page page-width"><div className="catalog-heading"><div><span>{q?`SEARCH RESULTS FOR “${q}”`:'VIVA MARKETPLACE'}</span><h1>{q?`Results for “${q}”`:title}</h1><p>{list.length} products found</p></div><button className="filter-mobile" onClick={()=>setMobile(true)}><SlidersHorizontal size={17}/> Filters</button></div>
  <div className="catalog-layout"><aside className={`filters ${mobile?'mobile-visible':''}`}><div className="filters-head"><b><Filter size={16}/> Filters</b><button onClick={clear}>Clear all</button><button className="filter-close" onClick={()=>setMobile(false)}><X size={18}/></button></div>
   <label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
   <label>Brand<select value={brand} onChange={e=>setBrand(e.target.value)}><option value="all">All brands</option>{brands.map(b=><option key={b}>{b}</option>)}</select></label>
   <label>Minimum rating<select value={rating} onChange={e=>setRating(e.target.value)}><option value="0">Any rating</option><option value="4.5">4.5★ & above</option><option value="4">4★ & above</option><option value="3.5">3.5★ & above</option></select></label>
   <label>Maximum price<input type="number" min="0" placeholder="₹ e.g. 5000" value={max} onChange={e=>setMax(e.target.value)}/></label>
   <label className="check-filter"><input type="checkbox" checked={deal} onChange={e=>setDeal(e.target.checked)}/> 50%+ discount only</label>
   <button className="apply-mobile" onClick={()=>setMobile(false)}>Apply filters</button>
  </aside>
  <section className="catalog-results"><div className="catalog-toolbar"><span><b>{list.length}</b> products</span><label><ArrowUpDown size={15}/> Sort <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="discount">Highest discount</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div>
   {list.length?<div className="product-grid">{list.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty-search"><SearchX size={45}/><h3>No products found</h3><p>Try changing your filters or search phrase.</p><button className="primary-btn" onClick={clear}>Clear filters</button></div>}
  </section></div></main>;
}
