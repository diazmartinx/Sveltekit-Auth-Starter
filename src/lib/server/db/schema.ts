import { sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	// other user attributes
	first_name: text('first_name'),
	last_name: text('last_name'),
	picture: text('picture'),
	email: text('email').notNull().unique(),
	username: text('username').unique(),
	//notion_token: text('notion_token'),
	//notion_template_id: text('notion_template_id')
});

export const session = sqliteTable('user_session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	activeExpires: blob('active_expires', {
		mode: 'bigint'
	}).notNull(),
	idleExpires: blob('idle_expires', {
		mode: 'bigint'
	}).notNull()
});

export const key = sqliteTable('user_key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	hashedPassword: text('hashed_password')
});
