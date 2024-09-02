export function displayGroupResults(resultsByRound) {
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
		console.log(`\n`);
	});
}

export function printFinalGroupStandings(finalPlacement) {
	console.log('Konačan plasman u grupama:');

	Object.keys(finalPlacement.groups).forEach((group) => {
		console.log(
			`    Grupa ${group} (Ime - pobede/porazi/bodovi/postignuti koševi/primljeni koševi/koš razlika)::`
		);

		const maxTeamNameLength = Math.max(
			...finalPlacement.groups[group].map((team) => team.team.length)
		);

		finalPlacement.groups[group].forEach((team, index) => {
			const formattedPointDifference =
				team.pointDifference >= 0
					? `+${team.pointDifference}`
					: `${team.pointDifference}`;
			const teamNamePadded = team.team.padEnd(maxTeamNameLength + 2, ' ');
			console.log(
				`        ${index + 1}. ${teamNamePadded}${team.wins} / ${
					team.losses
				} / ${team.points} / ${team.scored} / ${
					team.conceded
				} / ${formattedPointDifference}`
			);
		});
		console.log(`\n`);
	});
}

export function displayAdvancingTeams(advancingTeams) {
	console.log('Timovi koji prolaze u eliminacionu fazu: \n');
	advancingTeams.forEach((team) => {
		console.log(
			`Rang ${team.rank}: ${team.team} - Poeni: ${team.points}, Razlika poena: ${team.pointDifference}, Postignuti poeni: ${team.scored}`
		);
	});
}

export function displayHats(hatD, hatE, hatF, hatG) {
	console.log('\n');
	console.log('Šeširi:');

	console.log('    Šešir D');
	hatD.forEach((team) => console.log(`        ${team.team}`));

	console.log('    Šešir E');
	hatE.forEach((team) => console.log(`        ${team.team}`));

	console.log('    Šešir F');
	hatF.forEach((team) => console.log(`        ${team.team}`));

	console.log('    Šešir G');
	hatG.forEach((team) => console.log(`        ${team.team}`));
}

export function displayQuarterFinalPairs(quarterFinalPairs) {
	console.log('\nEliminaciona faza:');
	quarterFinalPairs.forEach((pair) =>
		console.log(`    ${pair[0].team} - ${pair[1].team}`)
	);
	console.log('\n');
}

export function displayPotencialSemiFinals(quarterFinalPairs) {
	const semiFinalPairs = [
		[quarterFinalPairs[0], quarterFinalPairs[2]],
		[quarterFinalPairs[1], quarterFinalPairs[3]],
	];

	semiFinalPairs.forEach((pair, index) => {
		console.log(
			`Potencijalno polufinale ${index + 1}: ${pair[0][0].team}/${
				pair[0][1].team
			} - ${pair[1][0].team}/${pair[1][1].team}`
		);
	});
}

export function displayEliminitionPhaseResult(results, title) {
	console.log('\n');
	console.log(`${title}:`);
	results.forEach((match) => {
		console.log(
			`     ${match.team1} - ${match.team2} (${match.team1FinalScore}: ${match.team2FinalScore})`
		);
	});
}

export function displayMedalWinners(finalMatch, thirdPlaceMatch) {
	const goldWinner =
		finalMatch.team1FinalScore > finalMatch.team2FinalScore
			? finalMatch.team1
			: finalMatch.team2;
	const silverWinner =
		finalMatch.team1FinalScore > finalMatch.team2FinalScore
			? finalMatch.team2
			: finalMatch.team1;
	const bronzeWinner =
		thirdPlaceMatch.team1FinalScore > thirdPlaceMatch.team2FinalScore
			? thirdPlaceMatch.team1
			: thirdPlaceMatch.team2;

	console.log('\nMedalje:');
	console.log(`1. ${goldWinner}`);
	console.log(`2. ${silverWinner}`);
	console.log(`3. ${bronzeWinner}`);
}
