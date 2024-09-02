import {
	displayGroupResults,
	printFinalGroupStandings,
	displayAdvancingTeams,
} from './printResult.js';
import { bubbleSort } from './sort.js';
import { rankTeamByPosition } from './rankTeambyPosition.js';
import { simulateMatch } from './simulateMatch.js';

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
				updateTable(matchResult, finalPlacement.groups[group]);
				roundResults.groups[group].push(matchResult);
				groupTeams[team1Index].Form += matchResult.team1Form;
				groupTeams[team2Index].Form += matchResult.team2Form;
			}
			bubbleSort(finalPlacement.groups[group]);
		});

		resultsByRound.push(roundResults);
	}

	displayGroupResults(resultsByRound);
	printFinalGroupStandings(finalPlacement);
	const advancingTeams = rankTeamByPosition(finalPlacement.groups);
	displayAdvancingTeams(advancingTeams);
	return advancingTeams;
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
				headToHead: {},
				FIBARanking: team.FIBARanking,
				Form: team.Form,
			});
		});
	});

	return finalPlacement;
}

function updateTable(matchResult, finalPlacement) {
	const [team1Stats, team2Stats] = [matchResult.team1, matchResult.team2].map(
		(team) => finalPlacement.find((t) => t.team === team)
	);

	if (matchResult.team1FinalScore > matchResult.team2FinalScore) {
		team1Stats.wins += 1;
		team2Stats.losses += 1;
	} else {
		team2Stats.wins += 1;
		team1Stats.losses += 1;
	}

	team1Stats.points = team1Stats.wins * 2 + team1Stats.losses;
	team2Stats.points = team2Stats.wins * 2 + team2Stats.losses;

	team1Stats.Form += matchResult.team1Form;
	team2Stats.Form += matchResult.team2Form;

	team1Stats.scored += matchResult.team1FinalScore;
	team1Stats.conceded += matchResult.team2FinalScore;

	team2Stats.scored += matchResult.team2FinalScore;
	team2Stats.conceded += matchResult.team1FinalScore;

	team1Stats.pointDifference +=
		matchResult.team1FinalScore - matchResult.team2FinalScore;
	team2Stats.pointDifference +=
		matchResult.team2FinalScore - matchResult.team1FinalScore;

	team1Stats.headToHead[team2Stats.team] =
		(team1Stats.headToHead[team2Stats.team] || 0) +
		(matchResult.team1FinalScore - matchResult.team2FinalScore);

	team2Stats.headToHead[team1Stats.team] =
		(team2Stats.headToHead[team1Stats.team] || 0) +
		(matchResult.team2FinalScore - matchResult.team1FinalScore);
}
