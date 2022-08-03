<script lang="ts">
	import '../app.scss';
</script>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		width: 480px;
		margin: 3em calc(50vw - 240px);
		padding: 3em;
		border: 1px solid black;
	}
</style>
