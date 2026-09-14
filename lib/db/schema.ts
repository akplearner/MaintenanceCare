import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * Every submission is persisted before the notification email is attempted.
 * A lead that fails to email but is stored is recoverable; the reverse is not.
 *
 * Note what is absent: there is no column for a gate, lockbox or alarm code,
 * and `accessNotes` is stored only after redaction. BUILD.md 9.4.
 */
export const leads = pgTable(
  'leads',
  {
    id: varchar('id', { length: 32 }).primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

    customerType: varchar('customer_type', { length: 32 }).notNull(),
    propertyCount: integer('property_count').notNull().default(1),
    company: varchar('company', { length: 120 }),

    address: varchar('address', { length: 200 }).notNull(),
    city: varchar('city', { length: 80 }).notNull(),
    zip: varchar('zip', { length: 5 }).notNull(),
    yearBuilt: smallint('year_built').notNull(),
    /** Denormalised at write time so a query never has to recompute the gate. */
    pre1978: boolean('pre_1978').notNull(),
    occupancy: varchar('occupancy', { length: 24 }).notNull(),

    divisions: jsonb('divisions').$type<string[]>().notNull(),
    description: text('description').notNull(),
    urgency: varchar('urgency', { length: 16 }).notNull(),

    accessNotes: varchar('access_notes', { length: 500 }),
    accessNotesRedacted: boolean('access_notes_redacted').notNull().default(false),

    photoUrls: jsonb('photo_urls').$type<string[]>().notNull().default([]),

    name: varchar('name', { length: 120 }).notNull(),
    email: varchar('email', { length: 254 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    contactPreference: varchar('contact_preference', { length: 8 }).notNull(),

    priority: varchar('priority', { length: 16 }).notNull(),
    /** Set once the notification email is accepted by the provider. */
    notifiedAt: timestamp('notified_at', { withTimezone: true }),
    notifyError: text('notify_error'),

    /** Attribution, so ad spend can be judged against actual leads. */
    source: varchar('source', { length: 120 }),
    referrer: varchar('referrer', { length: 500 }),
    userAgent: varchar('user_agent', { length: 500 }),
  },
  (table) => [
    index('leads_created_at_idx').on(table.createdAt),
    index('leads_priority_idx').on(table.priority),
    index('leads_email_idx').on(table.email),
  ],
);

export type LeadRow = typeof leads.$inferSelect;
export type NewLeadRow = typeof leads.$inferInsert;
