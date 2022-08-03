import { writable } from 'svelte/store';

export type Quiz = {
	category: string;
	type: boolean;
	difficulty: string;
	question: string;
	correct_answer: string;
	incorrect_answer: string[];
	answer?: string;
};

export type Quizzes = Quiz[] | [];

export const quizzesStore = writable([] as Quizzes);
