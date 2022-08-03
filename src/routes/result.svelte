<script lang="ts">
	import { onMount } from 'svelte';
	import { quizzesStore } from '../store';

	onMount(() => {
		if (!$quizzesStore.length && localStorage?.quizzes?.length) {
			quizzesStore.set(JSON.parse(localStorage.quizzes));
		}
	});
</script>

<div class="page-container flex flex-col gap-5 items-center justify-between">
	<div class="text-2xl text-center font-bold">
		You scored
		<!-- <div>{} / 10</div> -->
	</div>
	<div class="p-4 w-sm bg-white rounded-lg border border-gray-100 shadow-md flex flex-col gap-3">
		{#each $quizzesStore as quiz, i (quiz)}
			<div class="flex gap-3">
				<div class="text-lg">
					{i + 1}.
					{@html quiz.question}
					(<span class="text-blue-500 font-bold">{quiz.correct_answer}</span>,
					<span class="text-gray-400">Your answer: {quiz.answer || 'None'}</span>)
				</div>
				{#if quiz.answer === quiz.correct_answer}
					<svg
						class="w-32 inline-block text-green-900"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/></svg
					>
				{:else}
					<svg
						class="w-32 inline-block text-red-900"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/></svg
					>
				{/if}
			</div>
		{/each}
	</div>
	<a
		class="w-fit text-white disabled:opacity-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
		href="/"
		>Play again?
	</a>
</div>
