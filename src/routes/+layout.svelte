<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data: LayoutData;
</script>

<slot />
