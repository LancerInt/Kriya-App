import { prisma } from "@/lib/prisma";
export default async function Leads(){ const leads=await prisma.lead.findMany({orderBy:{createdAt:'desc'}}); return <main><h1>Leads</h1><a href='/api/admin/leads/export'>Export CSV</a>{leads.map(l=><div className='card' key={l.id}>{l.name} {l.region}/{l.country}</div>)}</main>; }
