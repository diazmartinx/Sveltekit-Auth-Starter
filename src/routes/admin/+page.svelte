<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{JSON.stringify(data.user)}

<a href="/auth/logout" class="btn variant-filled-surface">logout</a>