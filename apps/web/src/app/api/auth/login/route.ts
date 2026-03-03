import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return new Response("Unauthorized", { status: 401 });
  const token = await signSession({ userId: user.id, role: user.role, status: user.status });
  return new Response(JSON.stringify({ ok: true, status: user.status }), { headers: { "set-cookie": `session=${token}; HttpOnly; Path=/; SameSite=Lax` } });
}
