import { prisma } from "@/lib/prisma";

export default async function Facilities() {
  const rnd = await prisma.facilityContent.findUnique({ where: { key: "rnd-overview" } });
  return <main><h1>Facilities & Proof</h1><div className="card"><h3>R&D Lab Overview</h3><p>{(rnd?.contentI18n as any)?.en}</p></div><div className="card"><h3>Manufacturing Video</h3><p>Video is streamed via signed URL endpoint.</p></div><div className="card"><h3>Packing/Shipment Photos</h3><p>Published only after blur pipeline.</p></div></main>;
}
