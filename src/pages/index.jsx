import React from 'react'

import { departments, times } from '../options'
import { combine } from '../utils/filters'
import config from '../../data/siteConfig'

import DoughnutStats from '../components/DoughnutStats'
import Select from '../components/Select'

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
					comparisonData.length === 0 ? null : result.value - compAvg
			}
		})

class StartPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { ...config.defaultOptions }
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
