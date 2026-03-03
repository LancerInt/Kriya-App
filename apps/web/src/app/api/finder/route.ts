import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop")?.toLowerCase() || "";
  const pest = searchParams.get("pest")?.toLowerCase() || "";

  const products = await prisma.product.findMany({
    where: {
      cropsTags: crop ? { has: crop } : undefined,
      pestTags: pest ? { has: pest } : undefined
    }
  });

  return Response.json(products.map((p) => ({ id: p.id, slug: p.slug, name: p.nameI18n })));
}
