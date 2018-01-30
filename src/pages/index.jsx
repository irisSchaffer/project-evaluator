import React from 'react'

import DoughnutStats from '../components/DoughnutStats'
import { addMonths } from '../utils/date'
import config from '../../data/siteConfig'
import styles from './index.module.css'

const average = (acc, val, i) => (acc * i + val) / (i + 1)

const calcResults = results => fields =>
	fields.map(({ field, title }) => ({
		title,
		value: results.map(r => r[field]).reduce(average, 0)
	}))

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
		filter: () => true
	},
	1: {
		title: '1 month',
		date: subtractMonths(1),
		filter: timeFilter(subtractMonths(1))
	},
	3: {
		title: '3 months',
		date: subtractMonths(3),
		filter: timeFilter(subtractMonths(3))
	},
	6: {
		title: '6 months',
		date: subtractMonths(6),
		filter: timeFilter(subtractMonths(6))
	},
	12: {
		title: '12 months',
		date: subtractMonths(12),
		filter: timeFilter(subtractMonths(12))
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

		const results = calcResults(data)(config.shownStats)

		const resultsBefore = data.filter(
			timeFilter(subtractMonths(this.state.time * 2))
		)

		return (
			<div className={styles.root}>
				<section className={styles.section}>
					<div>
						<form className={styles.form}>
							<label htmlFor="department">
								<span>Department:</span>
								<select
									id="department"
									value={this.state.department}
									onChange={e =>
										this.setState({
											department: e.target.value
										})
									}
								>
									{Object.keys(departments).map(key => (
										<option value={key} key={key}>
											{departments[key].title}
										</option>
									))}
								</select>
							</label>
							<label htmlFor="timeframe">
								<span>Timeframe:</span>
								<select
									id="timeframe"
									value={this.state.time}
									onChange={e =>
										this.setState({ time: e.target.value })
									}
								>
									{Object.keys(times).map(key => (
										<option value={key} key={key}>
											{times[key].title}
										</option>
									))}
								</select>
							</label>
						</form>
						<DoughnutStats results={results} />
						<p>
							Total: {data.length} responses. Improvement
							measured from month before.
						</p>
					</div>
				</section>
			</div>
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
