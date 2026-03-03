import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Kriya Product Catalog PWA</h1>
      <div className="grid">
        <div className="card"><h3>Products</h3><Link href="/products">Browse catalog</Link></div>
        <div className="card"><h3>Crop/Pest Finder</h3><Link href="/finder">Find by tags</Link></div>
        <div className="card"><h3>Facilities & Proof</h3><Link href="/facilities">View media</Link></div>
        <div className="card"><h3>Request Quote</h3><Link href="/request-quote">Submit lead</Link></div>
        <div className="card"><h3>Offline Packs</h3><Link href="/offline-packs">Approved users only</Link></div>
        <div className="card"><h3>Admin CMS</h3><Link href="/admin">IT only</Link></div>
      </div>
    </main>
  );
}
