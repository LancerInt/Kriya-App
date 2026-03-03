import { prisma } from "@/lib/prisma";

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const rows = ["name,email,company,phone,region,country,qty,message,createdAt", ...leads.map((l) => [l.name,l.email,l.company||"",l.phone||"",l.region,l.country,l.qty,(l.message||"").replaceAll(","," "),l.createdAt.toISOString()].join(","))];
  return new Response(rows.join("\n"), { headers: { "content-type": "text/csv", "content-disposition": "attachment; filename=leads.csv" } });
}
