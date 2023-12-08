// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// adds in some helpers from lucia
		interface Locals {
			auth: import('lucia').AuthRequest;
			user?: Lucia.DatabaseUserAttributes;
		}
		// interface PageData {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import('./lib/server/auth/index').Auth;
		type DatabaseUserAttributes = {
			email: string;
			first_name: string;
			last_name: string;
			picture: string;
			//notion_token?: string;
			//notion_template_id?: string;
			username: string | null;
		};
		type DatabaseSessionAttributes = object;
	}
}

export {};
