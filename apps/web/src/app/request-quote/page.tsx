"use client";
import { useState } from "react";

export default function RequestQuote() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({name:"", email:"", company:"", phone:"", region:"Middle East", country:"", product:"", qty:"", message:""});
  const update=(k:string,v:string)=>setForm({...form,[k]:v});
  async function submit(){ await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)}); setDone(true); }
  const wa = `Hello, I’m ${form.name} and my email id ${form.email} from ${form.company || "<company>"}. I’m interested in ${form.product || "<product>"}. Country: ${form.country}. Quantity: ${form.qty}. Please share price and availability.`;
  return <main><h1>Request Quote</h1><div className="card"><input placeholder="name" onChange={e=>update('name',e.target.value)}/><input placeholder="email" onChange={e=>update('email',e.target.value)}/><input placeholder="country" onChange={e=>update('country',e.target.value)}/><input placeholder="quantity" onChange={e=>update('qty',e.target.value)}/><button onClick={submit}>Submit</button></div>{done && <div className="card"><p>Lead submitted.</p><a href={`https://wa.me/916385848466?text=${encodeURIComponent(wa)}`}>WhatsApp</a> | <a href={`mailto:info@kriya.ltd?subject=Kriya%20Quote&body=${encodeURIComponent(wa)}`}>Email</a></div>}</main>;
}
