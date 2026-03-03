import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await prisma.user.update({ where: { id: params.id }, data: { status: "REJECTED" } });
  return Response.json({ ok: true });
}
