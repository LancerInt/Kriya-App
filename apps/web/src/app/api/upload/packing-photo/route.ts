import sharp from "sharp";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file) return new Response("Missing file", { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  // Conservative mandatory blur policy: blur whole image before publishing.
  // Admin can pass rectangles (future UI) to apply targeted blur.
  const output = await sharp(Buffer.from(arrayBuffer)).blur(8).jpeg({ quality: 85 }).toBuffer();

  return new Response(output, { headers: { "content-type": "image/jpeg", "x-blur-applied": "true" } });
}
