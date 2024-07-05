import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const productTable = pgTable("products_table", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
