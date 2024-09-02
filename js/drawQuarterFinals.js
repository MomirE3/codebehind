import {
	displayHats,
	displayPotencialSemiFinals,
	displayQuarterFinalPairs,
} from './printResult.js';
import { getTeams } from './loadJsons.js';

export function drawQuarterFinals(advancingTeams) {
	const hatD = [];
	const hatE = [];
	const hatF = [];
	const hatG = [];

	advancingTeams.forEach((team) => {
		if (team.rank < 3) {
			hatD.push(team);
		} else if (team.rank < 5) {
			hatE.push(team);
		} else if (team.rank < 7) {
			hatF.push(team);
		} else if (team.rank < 9) {
			hatG.push(team);
		}
	});

	displayHats(hatD, hatE, hatF, hatG);

	const quarterFinalPairs = [
		...randomPairing(hatD, hatG),
		...randomPairing(hatE, hatF),
	];

	displayQuarterFinalPairs(quarterFinalPairs);
	displayPotencialSemiFinals(quarterFinalPairs);
	return quarterFinalPairs;
}

function randomPairing(hat1, hat2) {
	const pairs = [];

	const team1 = hat1.splice(Math.floor(Math.random() * hat1.length), 1)[0];
	const team2 = hat1.splice(Math.floor(Math.random() * hat1.length), 1)[0];
	const team3 = hat2.splice(Math.floor(Math.random() * hat2.length), 1)[0];
	const team4 = hat2.splice(Math.floor(Math.random() * hat2.length), 1)[0];

	const possibleCombinations = [
		[
			[team1, team3],
			[team2, team4],
		],
		[
			[team1, team4],
			[team2, team3],
		],
	];

	for (const combination of possibleCombinations) {
		const [pair1, pair2] = combination;
		const isMet1 = haveMetInGroup(pair1[0], pair1[1], getTeams());
		const isMet2 = haveMetInGroup(pair2[0], pair2[1], getTeams());

		if (!isMet1 && !isMet2) {
			pairs.push(pair1);
			pairs.push(pair2);
			break;
		}
	}

	return pairs;
}

function haveMetInGroup(team1, team2, groups) {
	return Object.keys(groups).some((group) => {
		const teams = groups[group];
		const team1InGroup = teams.some((team) => team.Team === team1.team);
		const team2InGroup = teams.some((team) => team.Team === team2.team);
		return team1InGroup && team2InGroup;
	});
}
