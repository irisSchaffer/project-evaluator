import React from 'react'

import DoughnutStats from '../components/DoughnutStats'
import Select from '../components/Select'
import { addMonths } from '../utils/date'
import config from '../../data/siteConfig'
import styles from './index.module.css'

const average = (acc, val, i) => (acc * i + val) / (i + 1)

const calcResults = (data, comparisonData) =>
	config.shownStats
		.map(({ field, title }) => ({
			title,
			field,
			value: data.map(r => r[field]).reduce(average, 0)
		}))
		.map(({ field, ...result }) => {
			const compAvg = comparisonData.map(r => r[field]).reduce(average, 0)
			return {
				...result,
				change:
					comparisonData.length === 0
						? null
						: result.value - compAvg
			}
		})

const departmentFilter = department => r => r.department === department
const timeFilter = (start, end = new Date()) => r =>
	r.completionDate >= start && r.completionDate <= end

const combine = (...filters) => r =>
	filters.reduce((acc, fn) => acc && fn(r), true)
const subtractMonths = months => addMonths(new Date())(0 - months)

const departments = {
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

const times = {
	0: {
		title: 'alltime',
		filter: () => true,
		comparisonFilter: timeFilter(new Date(1970), subtractMonths(1))
	},
	1: {
		title: '1 month',
		date: subtractMonths(1),
		filter: timeFilter(subtractMonths(1)),
		comparisonFilter: timeFilter(subtractMonths(1 * 2), subtractMonths(1))
	},
	3: {
		title: '3 months',
		date: subtractMonths(3),
		filter: timeFilter(subtractMonths(3)),
		comparisonFilter: timeFilter(subtractMonths(3 * 2), subtractMonths(3))
	},
	6: {
		title: '6 months',
		date: subtractMonths(6),
		filter: timeFilter(subtractMonths(6)),
		comparisonFilter: timeFilter(subtractMonths(6 * 2), subtractMonths(6))
	},
	12: {
		title: '12 months',
		date: subtractMonths(12),
		filter: timeFilter(subtractMonths(12)),
		comparisonFilter: timeFilter(subtractMonths(12 * 2), subtractMonths(12))
	}
}

class StartPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			department: 'all',
			time: '0'
		}
	}

	render() {
		const department = departments[this.state.department]
		const time = times[this.state.time]

		const filter = combine(department.filter, time.filter)

		const data = this.props.data.allGoogleSheetFormResponses1Row.edges
			.map(e => e.node)
			.map(result => ({
				...result,
				completionDate: new Date(result.completionDate)
			}))
			.filter(filter)

		const comparisonData = data.filter(time.comparisonFilter)

		const results = calcResults(data, comparisonData).map(r => ({
			...r,
			change: this.state.time === '0' ? 1 - r.change : r.change
		}))

		return (
			<section className={styles.root}>
				<form className={styles.form}>
					<Select
						className={styles.select}
						label="Department"
						value={this.state.department}
						onChange={e =>
							this.setState({ department: e.target.value })
						}
						options={Object.keys(departments).map(key => ({
							label: departments[key].title,
							value: key
						}))}
					/>
					<Select
						className={styles.select}
						label="Timeframe"
						value={this.state.time}
						onChange={e => this.setState({ time: e.target.value })}
						options={Object.keys(times).map(key => ({
							label: times[key].title,
							value: key
						}))}
					/>
				</form>
				<DoughnutStats results={results} />
				<aside className={styles.notes}>
					<ul>
						<li>Total: {data.length} responses.</li>
						<li>
							Improvement measured comparing the{' '}
							{this.state.time === '0'
								? 'alltime average to alltime average excluding the last month.'
								: `last ${time.title} to the ${
									time.title
								} before that.`}
						</li>
					</ul>
				</aside>
			</section>
		)
	}
}

export default StartPage

export const query = graphql`
	query StartPageQuery {
		allGoogleSheetFormResponses1Row {
			edges {
				node {
					timestamp
					name
					duration
					completionDate
					department
					workedAtOakwood
					enjoyment
					proudness
					innovativeness
					learned
					visuallyAppealing
					joyOfUse
				}
			}
		}
	}
`
