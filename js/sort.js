export function bubbleSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j].points < arr[j + 1].points) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			} else if (arr[j].points === arr[j + 1].points) {
				if (
					arr[j].headToHead[arr[j + 1].team] <
					arr[j + 1].headToHead[arr[j].team]
				) {
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				} else if (
					arr[j].pointDifference < arr[j + 1].pointDifference
				) {
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				}
			}
		}
	}
}

export function sortTeamsAfterGroupStage(a, b) {
	if (b.points !== a.points) return b.points - a.points;
	if (b.pointDifference !== a.pointDifference)
		return b.pointDifference - a.pointDifference;
	return b.scored - a.scored;
}
