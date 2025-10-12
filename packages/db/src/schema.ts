import {
  pgTable, uuid, text, timestamp, numeric, primaryKey, pgEnum, index
} from 'drizzle-orm/pg-core'

export const memberRole = pgEnum('member_role', ['owner', 'admin', 'viewer'])

export const org = pgTable('org', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const orgMember = pgTable('org_member', {
  orgId: uuid('org_id').notNull().references(() => org.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull(), // Supabase auth.users.id
  role: memberRole('role').notNull().default('owner'),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.orgId, t.userId] })
}))

export const shopifyOrderFact = pgTable('shopify_order_fact', {
  orgId: uuid('org_id').notNull().references(() => org.id, { onDelete: 'cascade' }),
  orderId: text('order_id').notNull(),
  shopId: text('shop_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  currency: text('currency').notNull(),
  totalPrice: numeric('total_price', { precision: 12, scale: 2 }).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.orgId, t.orderId] }),
  byOrgDate: index('idx_shopify_order_org_created').on(t.orgId, t.createdAt)
}))
