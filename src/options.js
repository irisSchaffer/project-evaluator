import { departmentFilter, timeFilter, subtractMonths } from './utils/filters'

export const getSelectOptions = options =>
	Object.keys(options).map(key => ({
		label: options[key].title,
		value: key
	}))

export const departments = {
	all: {
		title: 'Everyone',
		filter: () => true
	},
	dev: {
		title: 'Development',
		filter: departmentFilter('Development')
	},
	des: {
		title: 'Design',
		filter: departmentFilter('Design')
	},
	man: {
		title: 'Management',
		filter: departmentFilter('Management')
	}
}

export const times = {
	0: {
		title: 'alltime',
		filter: () => true,
		comparisonFilter: timeFilter(new Date(1970), subtractMonths(1))
	},
	1: {
		title: '1 month',
		filter: timeFilter(subtractMonths(1)),
		comparisonFilter: timeFilter(subtractMonths(1 * 2), subtractMonths(1))
	},
	3: {
		title: '3 months',
		filter: timeFilter(subtractMonths(3)),
		comparisonFilter: timeFilter(subtractMonths(3 * 2), subtractMonths(3))
	},
	6: {
		title: '6 months',
		filter: timeFilter(subtractMonths(6)),
		comparisonFilter: timeFilter(subtractMonths(6 * 2), subtractMonths(6))
	},
	12: {
		title: '12 months',
		filter: timeFilter(subtractMonths(12)),
		comparisonFilter: timeFilter(subtractMonths(12 * 2), subtractMonths(12))
	}
}
