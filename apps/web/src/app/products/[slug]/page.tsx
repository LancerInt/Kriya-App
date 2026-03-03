import { prisma } from "@/lib/prisma";

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { assets: { include: { asset: true } } }
  });
  if (!product) return <main>Not found</main>;

  const tds = product.assets.filter((a) => a.kind === "TDS");
  const certs = product.assets.filter((a) => a.kind === "CERTIFICATE");

  return (
    <main>
      <h1>{(product.nameI18n as any).en}</h1>
      <div className="card"><h3>Overview</h3><p>{(product.descriptionI18n as any).en}</p><p>{(product.microbialI18n as any).en}</p></div>
      <div className="card"><h3>Tags</h3><p>Crops: {product.cropsTags.join(", ")}</p><p>Pests: {product.pestTags.join(", ")}</p></div>
      <div className="card"><h3>Dossier</h3>
        {tds.map((a) => <p key={a.id}>TDS Version: {(a.metaJson as any).version} | Last updated: {(a.metaJson as any).lastUpdatedAt}</p>)}
        {certs.map((a) => <p key={a.id}>Certificate Version: {(a.metaJson as any).version} | Last updated: {(a.metaJson as any).lastUpdatedAt}</p>)}
      </div>
      <div className="card"><h3>Share/WhatsApp</h3><a href={`https://wa.me/916385848466?text=${encodeURIComponent(`Hello, I’m <name> and my email id <email> from <company>. I’m interested in ${(product.nameI18n as any).en}. Country: <country>. Quantity: <qty>. Please share price and availability.`)}`}>Open WhatsApp</a></div>
    </main>
  );
}
