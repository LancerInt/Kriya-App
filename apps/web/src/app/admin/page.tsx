import Link from "next/link";
export default function Admin(){return <main><h1>Admin CMS</h1><div className='grid'><div className='card'><Link href='/admin/users'>User approvals</Link></div><div className='card'><Link href='/admin/products'>Products CRUD</Link></div><div className='card'><Link href='/admin/leads'>Leads + CSV export</Link></div></div></main>}
