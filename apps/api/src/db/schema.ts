import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const candidates = sqliteTable("candidates", {
  id: text("id").primaryKey(),
  address: text("address"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  landAreaSquareMeters: real("land_area_square_meters"),
  listingPriceYen: integer("listing_price_yen"),
  listingUrl: text("listing_url"),
  note: text("note"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
