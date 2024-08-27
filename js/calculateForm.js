function calculatePointDifference(result) {
	const [teamScore, opponentScore] = result.split('-').map(Number);
	return teamScore - opponentScore;
}

export function calculateTeamForm(exibitionGames, teams) {
	const uniqueMatches = getUniquematches(exibitionGames);
	let teamForms = {};
	uniqueMatches.forEach((match) => {
		let pointDifference = calculatePointDifference(match.Result);
		let matchScore = Math.abs(pointDifference) / 10;

		teamForms[match.Team1] =
			(teamForms[match.Team1] || 0) +
			(pointDifference > 0 ? matchScore : -matchScore);
		teamForms[match.Team2] =
			(teamForms[match.Team2] || 0) +
			(pointDifference > 0 ? -matchScore : matchScore);
	});

	const updatedTeams = {};

	Object.keys(teams).forEach((key) => {
		updatedTeams[key] = teams[key].map((element) => {
			return {
				...element,
				Form: teamForms[element.ISOCode] || 0,
			};
		});
	});

	return updatedTeams;
}

function getUniquematches(exibitionGames) {
	const uniqueMatches = [];

	Object.keys(exibitionGames).forEach((key) => {
		exibitionGames[key].forEach((match) => {
			const newMatch = {
				Date: match.Date,
				Team1: key,
				Team2: match.Opponent,
				Result: match.Result,
			};

			if (!matchExists(uniqueMatches, newMatch)) {
				uniqueMatches.push(newMatch);
			}
		});
	});

	return uniqueMatches;
}

function matchExists(uniqueMatches, newMatch) {
	return uniqueMatches.some(
		(match) =>
			match.Date === newMatch.Date &&
			((match.Team1 === newMatch.Team1 &&
				match.Team2 === newMatch.Team2) ||
				(match.Team1 === newMatch.Team2 &&
					match.Team2 === newMatch.Team1))
	);
}
