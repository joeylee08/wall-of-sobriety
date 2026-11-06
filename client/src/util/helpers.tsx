const calculateSobriety = (soberSince: string) => {
	const [year, month, day] = soberSince.split('-').map(Number);
	const start = new Date(year, month - 1, day);

	const now = new Date();

	if (isNaN(start.getTime()) || start > now) return null;

	const addMonths = (date: Date, months: number) => {
		const year = date.getFullYear();
		const month = date.getMonth() + months;
		const lastDay = new Date(year, month + 1, 0).getDate();

		return new Date(
			year,
			month,
			Math.min(date.getDate(), lastDay),
			date.getHours(),
			date.getMinutes()
		);
	};

	let totalMonths =
		(now.getFullYear() - start.getFullYear()) * 12 +
		now.getMonth() - start.getMonth();

	if (addMonths(start, totalMonths) > now) totalMonths--;

	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	let cursor = addMonths(start, totalMonths);
	let days = 0;

	while (true) {
		const next = new Date(cursor);
		next.setDate(next.getDate() + 1);

		if (next > now) break;

		cursor = next;
		days++;
	}

	return { years, months, days };
};

export default calculateSobriety