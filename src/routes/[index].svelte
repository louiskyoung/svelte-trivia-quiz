<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { quizzesStore } from '../store';
	import type { Quiz } from '../store';
	let {
		params: { index }
	} = $page;
	let quiz = ($quizzesStore.length ? $quizzesStore[Number(index) - 1] : null) as Quiz;

	onMount(() => {
		if (!$quizzesStore.length && localStorage?.quizzes?.length) {
			quizzesStore.set(JSON.parse(localStorage.quizzes));
		}
	});

	afterUpdate(() => {
		quiz = $quizzesStore[Number(index) - 1];
		if ($quizzesStore.every((quiz) => quiz.answer)) {
			goto('/result');
		}
	});

	function handleNavigate(button: string) {
		const salt = button === 'prev' ? -1 : 1;
		const newIndex = Number(index) + salt;
		index = String(newIndex);
		goto(`/${newIndex}`);
	}

	function handleAnswer(answer: string) {
		const quizzes = JSON.parse(localStorage.quizzes);
		quizzes[Number(index) - 1] = {
			...quizzes[Number(index) - 1],
			answer
		};
		localStorage.quizzes = JSON.stringify(quizzes);

		quizzesStore.update((store) => {
			store[Number(index) - 1] = {
				...store[Number(index) - 1],
				answer
			};

			return store;
		});

		if (Number(index) < 10) {
			handleNavigate('next');
		}
	}
</script>

<div class="page-container flex flex-col gap-5 items-center justify-between">
	{#if !$quizzesStore.length}
		<div class="text-2xl text-center">Loading...</div>
	{:else}
		<div>
			<h1 class="text-3xl font-bold text-center">{quiz.category}</h1>
			<div class="text-lg text-gray-400 text-center mt-3">
				Difficulty: {quiz.difficulty}
			</div>
		</div>
		<div>
			<div class="p-6 max-w-sm bg-white rounded-lg border border-gray-100 shadow-md">
				<p class="text-2xl text-center mb-8">
					{@html quiz.question}
				</p>
				<div class="flex justify-center">
					{#if !quiz.answer}
						<button
							type="button"
							on:click={() => handleAnswer('True')}
							class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
							>True</button
						>
						<button
							type="button"
							on:click={() => handleAnswer('False')}
							class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
							>False</button
						>
					{:else}
						<div class="text-blue-500 text-xl">
							Your answer: <span class="font-bold">{quiz.answer}</span>
						</div>
					{/if}
				</div>
			</div>
			<div class="text-lg text-gray-400 text-center mt-10">{index} of 10</div>
		</div>
		<div class="flex justify-between w-full">
			<div>
				{#if Number(index) > 1}
					<button
						type="button"
						on:click={() => handleNavigate('prev')}
						class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
						>Prev</button
					>
				{/if}
			</div>
			<a
				type="button"
				href="/result"
				class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
				>End game</a
			>
			<div>
				{#if Number(index) < 10}
					<button
						type="button"
						on:click={() => handleNavigate('next')}
						class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
						>Next</button
					>
				{/if}
			</div>
		</div>
	{/if}
</div>
