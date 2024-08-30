import { displayHats, displayQuarterFinalPairs } from './printResult.js';

export function drawQuarterFinals(advancingTeams) {
	const hatD = advancingTeams.filter((team) => team.rank < 3);
	const hatE = advancingTeams.filter(
		(team) => team.rank >= 3 && team.rank < 5
	);
	const hatF = advancingTeams.filter(
		(team) => team.rank >= 5 && team.rank < 7
	);
	const hatG = advancingTeams.filter(
		(team) => team.rank >= 7 && team.rank < 9
	);

	displayHats(hatD, hatE, hatF, hatG);

	const quarterFinalPairs = [
		...simpleRandomPairing(hatD, hatG),
		...simpleRandomPairing(hatE, hatF),
	];

	displayQuarterFinalPairs(quarterFinalPairs);
}

function simpleRandomPairing(hat1, hat2) {
	const pairs = [];
	while (hat1.length > 0) {
		const team1 = hat1.splice(
			Math.floor(Math.random() * hat1.length),
			1
		)[0];
		const team2 = hat2.splice(
			Math.floor(Math.random() * hat2.length),
			1
		)[0];
		pairs.push([team1, team2]);
	}
	return pairs;
}
