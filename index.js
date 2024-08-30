import { calculateTeamForm } from './js/calculateForm.js';
import { groupStageResults } from './js/groupStage.js';
import { getTeams, getExibitionsMatchStats } from './js/loadJsons.js';
import { drawQuarterFinals } from './js/drawQuarterFinals.js';

const groupStageMatches = calculateTeamForm(
	getExibitionsMatchStats(),
	getTeams()
);
const advancingTeams = groupStageResults(groupStageMatches);
drawQuarterFinals(advancingTeams);
