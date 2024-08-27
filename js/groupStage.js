export function groupStageResults(groupStageMatches) {
	const resultsByRound = [];
	const permutations = [
		[0, 1, 2, 3],
		[0, 2, 1, 3],
		[0, 3, 1, 2],
	];
	const totalRounds =
		groupStageMatches[Object.keys(groupStageMatches)[0]].length - 1;
	const finalPlacement = initializeFinalPlacement(groupStageMatches);
	for (let round = 1; round <= totalRounds; round++) {
		const roundResults = { round, groups: {} };
		const mutualmatches = permutations[round - 1];

		Object.keys(groupStageMatches).forEach((group) => {
			const groupTeams = groupStageMatches[group];
			roundResults.groups[group] = [];

			for (let i = 0; i < mutualmatches.length; i += 2) {
				const team1Index = mutualmatches[i];
				const team2Index = mutualmatches[i + 1];
				const matchResult = simulateMatch(
					groupTeams[team1Index],
					groupTeams[team2Index]
				);

				const team1Stats = finalPlacement.groups[group][team1Index];
				const team2Stats = finalPlacement.groups[group][team2Index];

				// Ažuriranje statistike timova
				team1Stats.scored += matchResult.team1FinalScore;
				team1Stats.conceded += matchResult.team2FinalScore;
				team2Stats.scored += matchResult.team2FinalScore;
				team2Stats.conceded += matchResult.team1FinalScore;

				team1Stats.pointDifference +=
					matchResult.team1FinalScore - matchResult.team2FinalScore;
				team2Stats.pointDifference +=
					matchResult.team2FinalScore - matchResult.team1FinalScore;

				if (matchResult.team1FinalScore > matchResult.team2FinalScore) {
					team1Stats.wins += 1;
					team2Stats.losses += 1;
				} else {
					team2Stats.wins += 1;
					team1Stats.losses += 1;
				}

				console.log(team1Stats);
				console.log(team2Stats);

				// Ažuriranje bodova
				team1Stats.points = team1Stats.wins * 2 + team1Stats.losses;
				team2Stats.points = team2Stats.wins * 2 + team2Stats.losses;

				roundResults.groups[group].push(matchResult);
			}
			finalPlacement.groups[group].sort(
				(a, b) =>
					b.points - a.points || b.pointDifference - a.pointDifference
			);
		});

		resultsByRound.push(roundResults);
	}

	displayResults(resultsByRound);
	// console.log(resultsByRound);
	printFinalStandings(finalPlacement);

	return resultsByRound;
}

function simulateMatch(team1, team2) {
	const FORM_IMPACT = 1;
	const RANKING_IMPACT = 1.5;
	const team1Score =
		Math.random() +
		(team1.Form * FORM_IMPACT + (70 - team1.FIBARanking) * RANKING_IMPACT);
	const team2Score =
		Math.random() +
		(team2.Form * FORM_IMPACT + (70 - team2.FIBARanking) * RANKING_IMPACT);

	const team1FinalScore = Math.round(team1Score);
	const team2FinalScore = Math.round(team2Score);

	return {
		team1: team1.Team,
		team2: team2.Team,
		team1FinalScore,
		team2FinalScore,
	};
}

function displayResults(resultsByRound) {
	resultsByRound.forEach((roundResult) => {
		console.log(`Grupna faza - Kolo ${roundResult.round}:`);
		Object.keys(roundResult.groups).forEach((group) => {
			console.log(`    Grupa ${group}:`);
			roundResult.groups[group].forEach((match) => {
				console.log(
					`        ${match.team1} - ${match.team2} (${match.team1FinalScore}:${match.team2FinalScore})`
				);
			});
		});
	});
}

function printFinalStandings(finalPlacement) {
	console.log('Konačan plasman u grupama:');

	Object.keys(finalPlacement.groups).forEach((group) => {
		console.log(
			`    Grupa ${group} (Ime - pobede/porazi/bodovi/postignuti koševi/primljeni koševi/koš razlika)::`
		);
		finalPlacement.groups[group].forEach((team, index) => {
			const formattedPointDifference =
				team.pointDifference >= 0
					? `+${team.pointDifference}`
					: `${team.pointDifference}`;
			console.log(
				`        ${index + 1}. ${team.team} ${team.wins} / ${
					team.losses
				} / ${team.points} / ${team.scored} / ${
					team.conceded
				} / ${formattedPointDifference}`
			);
		});
	});
}

function initializeFinalPlacement(groupStageMatches) {
	const finalPlacement = { groups: {} };

	Object.keys(groupStageMatches).forEach((group) => {
		finalPlacement.groups[group] = [];
		const groupTeams = groupStageMatches[group];

		groupTeams.forEach((team) => {
			finalPlacement.groups[group].push({
				team: team.Team,
				wins: 0,
				losses: 0,
				points: 0,
				scored: 0,
				conceded: 0,
				pointDifference: 0,
			});
		});
	});

	return finalPlacement;
}
