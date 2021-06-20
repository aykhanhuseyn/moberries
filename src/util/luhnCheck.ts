const evensMap = new Map([
	[0, 0],
	[1, 2],
	[2, 4],
	[3, 6],
	[4, 8],
	[5, 1],
	[6, 3],
	[7, 5],
	[8, 7],
	[9, 9],
]);

function luhnCheck(card: string): boolean {
	if (typeof card !== 'string') return false;
	card = card.replace(/\s/g, '');
	if (card.length !== 16) return false;
	console.log('luhnCheck', card);
	let even = 0,
		odd = 0;
	for (let i = 0; i < card.length; i++) {
		if (i % 2 === 0) {
			even += evensMap.get(+card[i]) ?? 0;
		} else {
			odd += +card[i];
		}
	}
	return !((even + odd) % 10);
}

export default luhnCheck;
