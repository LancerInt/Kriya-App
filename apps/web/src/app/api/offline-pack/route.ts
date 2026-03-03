import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ include: { assets: { include: { asset: true } } } });
  return Response.json({
    version: new Date().getFullYear().toString(),
    lastSync: new Date().toISOString(),
    products
  });
}
