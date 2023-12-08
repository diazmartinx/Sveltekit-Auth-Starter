import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	// clear out the user's sessions
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/admin');
	await auth.invalidateSession(session.sessionId); // invalidate session
	locals.auth.setSession(null); // remove cookie
	throw redirect(302, '/');
};
