import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { updatedAt: "desc" } });
  return (
    <main>
      <h1>Products</h1>
      <div className="grid">
        {products.map((p) => (
          <article className="card" key={p.id}>
            <h3>{(p.nameI18n as any).en}</h3>
            <p>{(p.descriptionI18n as any).en}</p>
            <small>Category: {(p.category.nameI18n as any).en}</small>
            <br />
            <Link href={`/products/${p.slug}`}>Open details</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
