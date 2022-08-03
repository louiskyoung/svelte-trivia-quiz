<script lang="ts">
	import { onMount } from 'svelte';
	import { quizzesStore } from '../store';

	onMount(async () => {
		const { results } = await fetch('https://opentdb.com/api.php?amount=10&type=boolean').then(
			(res) => res.json()
		);
		quizzesStore.set(results);
		localStorage.quizzes = JSON.stringify(results);
	});

	let isLoading: boolean;
	$: isLoading = !$quizzesStore.length;
</script>

<div class="page-container flex flex-col gap-10 items-center justify-between">
	<h1 class="text-3xl font-bold text-center">Welcome to the Trivia Challenge!</h1>
	<p class="text-2xl text-center">You will be presented with 10 True or False questions.</p>
	<p class="text-2xl text-center">Can you score 100%?</p>
	<a
		class="w-fit text-white disabled:opacity-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
		href={!isLoading ? '/1' : ''}
		>{isLoading ? 'Loading quizzes...' : "Let's begin!"}
	</a>
</div>
