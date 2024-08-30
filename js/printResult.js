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
	console.log('Teams advancing to the elimination phase: \n');
	advancingTeams.forEach((team) => {
		console.log(
			`Rank ${team.rank}: ${team.team} - Points: ${team.points}, Point Difference: ${team.pointDifference}, Scored: ${team.scored}`
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
}
