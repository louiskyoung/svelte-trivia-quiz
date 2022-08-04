/** @type {import('./__types/[id]').RequestHandler} */
export async function GET() {
	const { results } = await fetch('https://opentdb.com/api.php?amount=10&type=boolean').then(
		(res) => res.json()
	);

	return {
		body: { quizzes: results }
	};
}
