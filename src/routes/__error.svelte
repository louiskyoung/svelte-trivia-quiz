<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }: { error: Error; status: string }) {
		return {
			props: {
				status,
				error
			}
		};
	}
</script>

<script lang="ts">
	export let status: string;
	export let error: Error;
</script>

<div class="page-container flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold">Error {status}: {error.message}</h1>
</div>
