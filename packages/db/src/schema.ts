import {
  pgTable, uuid, text, timestamp, numeric, primaryKey, pgEnum, index, foreignKey
} from 'drizzle-orm/pg-core'
import { datePresetsArray } from './datePresets'

export const memberRole = pgEnum('member_role', ['owner', 'admin', 'viewer'])
export const datePreset = pgEnum('date_preset', datePresetsArray)

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
  pk: primaryKey({ columns: [t.orgId, t.userId] }),
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
  idxShopifyOrderOrgCreated: index('idx_shopify_order_org_created').on(t.orgId, t.createdAt),
}))

export const orgSettings = pgTable('org_settings', {
  orgId: uuid('org_id').primaryKey().notNull().references(() => org.id, { onDelete: 'cascade' }),
  billingEmail: text('billing_email').notNull(),
})

export const orgMemberSettings = pgTable('org_member_settings', {
  orgId: uuid('org_id').notNull(),
  userId: uuid('user_id').notNull(),
  datePreset: datePreset('date_preset').notNull().default('Last 30 days'),
  timeZone: text('timezone').notNull().default('Europe/Copenhagen'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.orgId, t.userId] }),
  orgMemberFk: foreignKey({
    columns: [t.orgId, t.userId],
    foreignColumns: [orgMember.orgId, orgMember.userId],
    name: 'org_member_settings_org_member_fk',
  }).onDelete('cascade'),
}))