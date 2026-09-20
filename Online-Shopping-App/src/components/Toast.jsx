import { CheckCircle2, XCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
export default function Toast() {
  const { state } = useShop();
  if (!state.toast) return null;
  const error = state.toast.type === 'error';
  return <div className={`toast ${error ? 'toast-error' : ''}`}><span className="toast-icon">{error ? <XCircle size={19}/> : <CheckCircle2 size={19}/>}</span><span>{state.toast.message}</span></div>;
}
