import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();
	if (session) {
		event.locals.user = session.user;
	}

	//only authenticated users can access /admin
	if (event.url.pathname.startsWith('/admin') && !event.locals.user) {
		throw redirect(302, '/'); //redirect to login page
	}

	return await resolve(event);
};
