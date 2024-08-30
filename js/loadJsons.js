import fs from 'fs';

export const getTeams = () => {
	const data = fs.readFileSync('./jsons/groups.json');
	return JSON.parse(data);
};

export const getExibitionsMatchStats = () => {
	const data = fs.readFileSync('./jsons/exibitions.json');
	return JSON.parse(data);
};
