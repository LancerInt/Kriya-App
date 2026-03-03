import { prisma } from "@/lib/prisma";
export default async function AdminProducts(){ const products=await prisma.product.findMany(); return <main><h1>Products CRUD</h1>{products.map(p=><div className='card' key={p.id}>{(p.nameI18n as any).en} | crops: {p.cropsTags.join(',')}</div>)}</main>; }
