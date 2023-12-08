import { auth, googleAuth } from '$lib/server/auth';
import { OAuthRequestError } from '@lucia-auth/oauth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('google_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	console.log(storedState, state, code);
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					email: googleUser.email!,
					first_name: googleUser.given_name,
					last_name: googleUser.family_name,
					picture: googleUser.picture,
					username: null
				}
			});
			return user;
		};

		const user = await getUser();
		console.log(user);
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/admin'
			}
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			console.error(e);
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
