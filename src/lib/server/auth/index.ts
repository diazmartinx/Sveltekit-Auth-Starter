import { lucia } from 'lucia';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { libsqlClient } from '../db';
import { sveltekit } from 'lucia/middleware';
import { google } from '@lucia-auth/oauth/providers';
import { env } from '$env/dynamic/private';

export const auth = lucia({
	adapter: libsql(libsqlClient, {
		user: 'user',
		key: 'user_key',
		session: 'user_session'
	}),
	env: 'DEV',
	// gives us a bunch of helper functions
	middleware: sveltekit(),
	getUserAttributes: (databaseUser) => {
		return {
			first_name: databaseUser.first_name,
			last_name: databaseUser.last_name,
			email: databaseUser.email,
			picture: databaseUser.picture,
			username: databaseUser.username
		};
	}
});

export const googleAuth = google(auth, {
	clientId: env.GOOGLE_CLIENT_ID!,
	clientSecret: env.GOOGLE_CLIENT_SECRET!,
	redirectUri: 'http://localhost:5173/auth/google/callback',
	scope: ['profile', 'email']
});
