import {
  pgTable, uuid, text, timestamp, numeric, primaryKey, pgEnum, index, foreignKey
} from 'drizzle-orm/pg-core'
import { datePresetsArray } from './datePresets'

export const memberRole = pgEnum('member_role', ['owner', 'admin', 'viewer'])
export const datePreset = pgEnum('date_preset', datePresetsArray)

export const org = pgTable('org', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdBy: uuid('createdBy').references(() => user.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const user = pgTable('user', {
  id: uuid('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const orgMember = pgTable('org_member', {
  orgId: uuid('org_id').notNull().references(() => org.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  role: memberRole('role').notNull().default('admin'),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
}, (t) => ([
  primaryKey({ columns: [t.orgId, t.userId] }),
]))

export const orgSettings = pgTable('org_settings', {
  orgId: uuid('org_id').primaryKey().notNull().references(() => org.id, { onDelete: 'cascade' }),
  billingEmail: text('billing_email').notNull(),
})

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade'}),
  datePreset: datePreset('date_preset').notNull().default('Last 30 days'),
  timeZone: text('timezone').notNull().default('Europe/Copenhagen'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const shopifyOrderFact = pgTable('shopify_order_fact', {
  orgId: uuid('org_id').notNull().references(() => org.id, { onDelete: 'cascade' }),
  orderId: text('order_id').notNull(),
  shopId: text('shop_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  currency: text('currency').notNull(),
  totalPrice: numeric('total_price', { precision: 12, scale: 2 }).notNull(),
}, (t) => ([
  primaryKey({ columns: [t.orgId, t.orderId] }),
  index('idx_shopify_order_org_created').on(t.orgId, t.createdAt),
]))