import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  region: z.string().min(1),
  country: z.string().min(1),
  product: z.string().optional(),
  qty: z.string().min(1),
  message: z.string().optional().default("")
});

export async function POST(req: Request) {
  const data = schema.parse(await req.json());
  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      region: data.region,
      country: data.country,
      qty: data.qty,
      message: data.message,
      productId: null
    }
  });
  return Response.json({ ok: true, id: lead.id });
}
