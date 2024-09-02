import { simulateMatch } from './simulateMatch.js';
import {
	displayEliminitionPhaseResult,
	displayMedalWinners,
} from './printResult.js';

export function eliminationPhase(quarterFinalPairs) {
	const semiFinalDraw = [
		[quarterFinalPairs[0], quarterFinalPairs[2]],
		[quarterFinalPairs[1], quarterFinalPairs[3]],
	];

	const semiFinalPairs = [];
	const quarterFinalResults = [];

	semiFinalDraw.forEach((pairs) => {
		pairs.forEach((teamPair) => {
			const matchResult = simulateMatch(teamPair[0], teamPair[1]);

			if (matchResult.team1FinalScore > matchResult.team2FinalScore) {
				teamPair[0].Form += matchResult.team1Form;
				semiFinalPairs.push(teamPair[0]);
			} else {
				teamPair[1].Form += matchResult.team2Form;
				semiFinalPairs.push(teamPair[1]);
			}
			quarterFinalResults.push(matchResult);
		});
	});

	displayEliminitionPhaseResult(quarterFinalResults, 'Četvrtfinale');
	semiFinal(semiFinalPairs);
}

function semiFinal(semiFinalPairs) {
	const grandFinale = [];
	const thirdPlace = [];
	const semiFinalResults = [];

	for (let i = 0; i < semiFinalPairs.length; i += 2) {
		const matchResult = simulateMatch(
			semiFinalPairs[i],
			semiFinalPairs[i + 1]
		);
		if (matchResult.team1FinalScore > matchResult.team2FinalScore) {
			semiFinalPairs[i].Form += matchResult.team1Form;
			grandFinale.push(semiFinalPairs[i]);
			thirdPlace.push(semiFinalPairs[i + 1]);
		} else {
			semiFinalPairs[i + 1].Form += matchResult.team2Form;
			grandFinale.push(semiFinalPairs[i + 1]);
			thirdPlace.push(semiFinalPairs[i]);
		}
		semiFinalResults.push(matchResult);
	}

	displayEliminitionPhaseResult(semiFinalResults, 'Polufinale');
	finalAndThirdPlace(grandFinale, thirdPlace);
}

function finalAndThirdPlace(grandFinale, thirdPlace) {
	const thirdPlaceMatch = simulateMatch(thirdPlace[0], thirdPlace[1]);
	const finalMatch = simulateMatch(grandFinale[0], grandFinale[1]);

	displayEliminitionPhaseResult([thirdPlaceMatch], 'Utakmica za treće mesto');
	displayEliminitionPhaseResult([finalMatch], 'Finale');

	displayMedalWinners(finalMatch, thirdPlaceMatch);
}
