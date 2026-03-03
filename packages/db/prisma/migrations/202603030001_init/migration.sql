-- Initial schema migration
CREATE TYPE "Role" AS ENUM ('PUBLIC', 'USER', 'ADMIN');
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "AssetType" AS ENUM ('IMAGE', 'PDF', 'VIDEO');
CREATE TYPE "ProductAssetKind" AS ENUM ('GALLERY', 'BROCHURE', 'TDS', 'CERTIFICATE', 'VIDEO', 'PACKING_PHOTO');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'USER',
  "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Category" (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT NOT NULL UNIQUE,
  "nameI18n" JSONB NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "Product" (
  "id" TEXT PRIMARY KEY,
  "categoryId" TEXT NOT NULL REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "slug" TEXT NOT NULL UNIQUE,
  "nameI18n" JSONB NOT NULL,
  "descriptionI18n" JSONB NOT NULL,
  "microbialI18n" JSONB NOT NULL,
  "cropsTags" TEXT[] NOT NULL,
  "pestTags" TEXT[] NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Asset" (
  "id" TEXT PRIMARY KEY,
  "type" "AssetType" NOT NULL,
  "storageKey" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "isPublic" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ProductAsset" (
  "id" TEXT PRIMARY KEY,
  "productId" TEXT NOT NULL REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "assetId" TEXT NOT NULL REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "kind" "ProductAssetKind" NOT NULL,
  "metaJson" JSONB NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "FacilityContent" (
  "id" TEXT PRIMARY KEY,
  "key" TEXT NOT NULL UNIQUE,
  "contentI18n" JSONB NOT NULL,
  "assetsJson" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Lead" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "company" TEXT,
  "phone" TEXT,
  "region" TEXT NOT NULL,
  "country" TEXT NOT NULL,
  "productId" TEXT,
  "qty" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "ProductAsset_productId_kind_idx" ON "ProductAsset"("productId", "kind");
CREATE INDEX "Lead_region_country_createdAt_idx" ON "Lead"("region", "country", "createdAt");
