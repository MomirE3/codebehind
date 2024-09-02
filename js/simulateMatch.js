export function simulateMatch(team1, team2) {
	const FORM_IMPACT = 0.5;
	const RANKING_IMPACT = 1.5;

	let team1FinalScore = Math.round(
		Math.random() +
			(team1.Form * FORM_IMPACT +
				(70 - team1.FIBARanking) * RANKING_IMPACT)
	);
	let team2FinalScore = Math.round(
		Math.random() +
			(team2.Form * FORM_IMPACT +
				(70 - team2.FIBARanking) * RANKING_IMPACT)
	);

	while (team1FinalScore === team2FinalScore) {
		team1FinalScore += Math.round(Math.random());
		team2FinalScore += Math.round(Math.random());
	}

	const [team1Form, team2Form] = calculateForm(
		{ ...team1, Score: team1FinalScore },
		{ ...team2, Score: team2FinalScore }
	);

	return {
		team1: team1.Team || team1.team,
		team2: team2.Team || team2.team,
		team1FinalScore,
		team2FinalScore,
		team1Form,
		team2Form,
	};
}

function calculateForm(team1, team2) {
	const pointDifference = team1.Score - team2.Score;
	const rankingDifference = team1.FIBARanking - team2.FIBARanking;

	let team1Form = pointDifference / 10;
	let team2Form = -team1Form;

	const rankingAdjustment =
		rankingDifference > 0
			? rankingDifference / 10
			: -rankingDifference / 20;

	if (pointDifference > 0) {
		team1Form += rankingAdjustment;
	} else {
		team2Form += rankingAdjustment;
	}

	return [team1Form, team2Form];
}
