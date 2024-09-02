import { sortTeamsAfterGroupStage } from './sort.js';

export function rankTeamByPosition(groups) {
	const firstPlaceTeams = [];
	const secondPlaceTeams = [];
	const thirdPlaceTeams = [];

	Object.keys(groups).forEach((group) => {
		const finalPlacementGroup = groups[group];
		firstPlaceTeams.push(finalPlacementGroup[0]);
		secondPlaceTeams.push(finalPlacementGroup[1]);
		thirdPlaceTeams.push(finalPlacementGroup[2]);
	});

	firstPlaceTeams.sort(sortTeamsAfterGroupStage);
	secondPlaceTeams.sort(sortTeamsAfterGroupStage);
	thirdPlaceTeams.sort(sortTeamsAfterGroupStage);

	const finalRanking = [
		...firstPlaceTeams.map((team, index) => ({
			...team,
			rank: index + 1,
		})),
		...secondPlaceTeams.map((team, index) => ({
			...team,
			rank: index + 4,
		})),
		...thirdPlaceTeams.map((team, index) => ({
			...team,
			rank: index + 7,
		})),
	];

	const advancingTeams = finalRanking.slice(0, 8);
	return advancingTeams;
}
