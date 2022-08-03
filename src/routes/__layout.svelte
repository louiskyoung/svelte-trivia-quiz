<script lang="ts">
	import '../app.scss';
</script>

<main class="p-12 rounded-lg border border-gray-200 shadow-md">
	<slot />
</main>

<style lang="scss">
	main {
		width: 480px;
		margin: 3rem calc(50vw - 240px);
	}
</style>
