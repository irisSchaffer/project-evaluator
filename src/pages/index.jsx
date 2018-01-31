import React from 'react'

import { departments, times } from '../options'
import { combine } from '../utils/filters'
import { calculateResults } from '../utils/results'
import config from '../../data/siteConfig'

import DoughnutStats from '../components/DoughnutStats'
import Select from '../components/Select'

import styles from './index.module.css'

class StartPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { ...config.defaultOptions }
	}

	getData() {
		const department = departments[this.state.department]
		const time = times[this.state.time]

		const filter = combine(department.filter, time.filter)
		return this.props.data.allGoogleSheetFormResponses1Row.edges
			.map(e => e.node)
			.map(result => ({
				...result,
				completionDate: new Date(result.completionDate)
			}))
			.filter(filter)
	}

	getResults(data, comparisonData) {
		const results = calculateResults(config.shownStats)({
			data,
			comparisonData
		})

		return results.map(r => ({
			...r,
			change: this.state.time === '0' ? 1 - r.change : r.change
		}))
	}

	getImprovementText() {
		const timeSpan = times[this.state.time].title

		if (this.state.time === '0') {
			return 'Improvement measured comparing the alltime average to alltime average excluding the last month.'
		}

		return `Improvement measured comparing the last ${timeSpan} to the ${timeSpan} before that.`
	}

	render() {
		const time = times[this.state.time]

		const data = this.getData()
		const comparisonData = data.filter(time.comparisonFilter)
		const results = this.getResults(data, comparisonData)

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
						<li>{this.getImprovementText()}</li>
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
