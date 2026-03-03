import { PrismaClient, Role, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const i18n = (en: string, fr: string, ar: string, zh: string) => ({ en, fr, ar, zh });

async function main() {
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  await prisma.user.upsert({
    where: { email: "admin@kriya.ltd" },
    update: {},
    create: {
      email: "admin@kriya.ltd",
      passwordHash: adminPassword,
      role: Role.ADMIN,
      status: UserStatus.APPROVED
    }
  });

  const bio = await prisma.category.upsert({
    where: { slug: "bio-fertilizers" },
    update: {},
    create: { slug: "bio-fertilizers", sortOrder: 1, nameI18n: i18n("Bio Fertilizers", "Bio-engrais", "أسمدة حيوية", "生物肥料") }
  });

  const product = await prisma.product.upsert({
    where: { slug: "kriya-grow-plus" },
    update: {},
    create: {
      categoryId: bio.id,
      slug: "kriya-grow-plus",
      nameI18n: i18n("Kriya Grow Plus", "Kriya Croissance Plus", "كريا النمو بلس", "Kriya 生长增强"),
      descriptionI18n: i18n("Multi-strain microbial growth promoter.", "Promoteur de croissance microbien multi-souches.", "محفز نمو ميكروبي متعدد السلالات.", "多菌株微生物生长促进剂。"),
      microbialI18n: i18n("Improves nutrient uptake and root vigor.", "Améliore l'absorption des nutriments.", "يحسن امتصاص العناصر الغذائية.", "提高养分吸收和根系活力。"),
      cropsTags: ["rice", "cotton", "vegetables"],
      pestTags: ["root-rot", "blight"]
    }
  });

  await prisma.facilityContent.upsert({
    where: { key: "rnd-overview" },
    update: {},
    create: {
      key: "rnd-overview",
      contentI18n: i18n("R&D facility with microbial quality labs.", "Installation R&D avec laboratoires microbiens.", "منشأة بحث وتطوير مع مختبرات ميكروبية.", "微生物质量实验室研发中心。"),
      assetsJson: []
    }
  });

  console.log("Seed completed", product.slug);
}

main().finally(async () => {
  await prisma.$disconnect();
});
