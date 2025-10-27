import {
  pgTable, uuid, text, timestamp, numeric, primaryKey, pgEnum, index, foreignKey, unique, boolean, smallint
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
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id').notNull().references(() => org.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  roleId: uuid('role_id').references(() => orgRole.id, { onDelete: 'set null' }),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
}, (t) => ([
  unique().on(t.orgId, t.userId)
]))

export const dataSource = pgTable('data_source', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique()
})

export const orgDataSourceStatus = pgTable('org_data_source_status', {
  orgId: uuid('org_id').notNull().references(() => org.id, { onDelete: 'cascade' }),
  dataSourceId: uuid('data_source_id').notNull().references(() => dataSource.id, { onDelete: 'cascade' }),
  connected: boolean('connected').notNull()
}, (t) => ([
  primaryKey({ columns: [t.orgId, t.dataSourceId]})
]))

export const orgRole = pgTable('org_role', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id').notNull().references(() => org.id, { onDelete: 'cascade' }),
  name: text('name').notNull()
}, (t) => ([
  unique().on(t.orgId, t.name)
]))

export const orgRolePermission = pgTable('org_role_permissions', {
  orgRoleId: uuid('org_role_id').notNull().references(() => orgRole.id, { onDelete: 'cascade'}),
  dataSourceId: uuid('data_source_id').notNull().references(() => dataSource.id, { onDelete: 'cascade'}),
  canView: boolean('can_view').notNull()
}, (t) => ([
  primaryKey({ columns: [t.orgRoleId, t.dataSourceId]})
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