import fs from 'fs';
import { calculateTeamForm } from './js/calculateForm.js';
import { groupStageResults } from './js/groupStage.js';

const getTeams = () => {
	const data = fs.readFileSync('./jsons/groups.json');
	return JSON.parse(data);
};

const getExibitionsMatchStats = () => {
	const data = fs.readFileSync('./jsons/exibitions.json');
	return JSON.parse(data);
};

const groupStageMatches = calculateTeamForm(
	getExibitionsMatchStats(),
	getTeams()
);
groupStageResults(groupStageMatches);
