# Admin Guide (IT Team)

## User approval workflow
1. Distributor/Sales signs up.
2. User status is set to `PENDING`.
3. IT Admin reviews in `/admin/users` and approves/rejects.
4. Only `APPROVED` users can download offline packs.

## Product translation workflow
- Product/category/facility text fields are stored in JSON i18n format:
  - `{ en: "", zh: "", ar: "", fr: "" }`
- Admin should update all language entries before publishing.
- Arabic RTL is automatically enabled in frontend when language is switched to `ar`.

## Media workflow
- Upload images/PDF/videos as assets.
- For packing/shipment photos, publish only through blur endpoint:
  - `/api/upload/packing-photo`
- Original images must remain private storage only.

## Leads and routing
- Leads collected through `/request-quote`.
- Current fixed routing:
  - Email: `info@kriya.ltd`
  - WhatsApp: `+91 63858 48466`
- Region/country selections are still recorded for future routing.

## Offline pack operations
- Endpoint: `/api/offline-pack`
- Contains all products and asset metadata for all languages.
- Client supports download/update/delete offline data and shows offline status.
