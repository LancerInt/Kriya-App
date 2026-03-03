import { prisma } from "@/lib/prisma";
export default async function Users(){ const users=await prisma.user.findMany({orderBy:{createdAt:'desc'}}); return <main><h1>User Management</h1>{users.map(u=><div className='card' key={u.id}>{u.email} - {u.role} - {u.status}</div>)}</main>; }
