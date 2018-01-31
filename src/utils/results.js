const average = (acc, val, i) => (acc * i + val) / (i + 1)

export const calculateResults = shownStats => ({ data, comparisonData }) =>
	shownStats.map(({ field, title }) => {
		const compAvg = comparisonData.map(r => r[field]).reduce(average, 0)
		const value = data.map(r => r[field]).reduce(average, 0)
		return {
			title,
			field,
			value,
			change: comparisonData.length === 0 ? null : value - compAvg
		}
	})
