import { lucia } from 'lucia';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { libsqlClient } from '../db';
import { sveltekit } from 'lucia/middleware';
import { google } from '@lucia-auth/oauth/providers';

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
	clientId: '207013047010-hfpk9a7pko1b5mkr0qknnprp3312m4qd.apps.googleusercontent.com',
	clientSecret: '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',
	redirectUri: 'http://localhost:5173/auth/google/callback',
	scope: ['profile', 'email']
});
