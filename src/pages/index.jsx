import React from 'react'

import DoughnutStats from '../components/DoughnutStats'
import { addMonths } from '../utils/date'

const average = (acc, val, i) => (acc * i + val) / (i + 1)

const calcResults = results => fields => (filter = () => true) => {
	const filteredResults = results.filter(filter)

	return fields.map(({ field, title }) => ({
		title,
		value: filteredResults.map(r => r[field]).reduce(average, 0) / 5
	}))
}

const departmentFilter = department => r => r.department === department
const timeFilter = (start, end = new Date()) => r => r.completionDate >= start && r.completionDate <= end

const combine = filters => r => filters.reduce((acc, fn) => fn(acc), r)
const subtractMonths = months => addMonths(new Date())(0 - months)

export default ({ data }) => {
	const results = data.allGoogleSheetFormResponses1Row.edges
		.map(e => e.node)
		.map(result => ({
			...result,
			completionDate: new Date(result.completionDate)
		}))

	const getResults = calcResults(results)([
		{
			field: 'enjoyment',
			title: 'Overall Enjoyment'
		},
		{
			field: 'proudness',
			title: 'Proudness'
		},
		{
			field: 'innovativeness',
			title: 'Innovativeness'
		},
		{
			field: 'learned',
			title: 'Learned'
		},
		{
			field: 'visuallyAppealing',
			title: 'Visually Appealing'
		},
		{
			field: 'joyOfUse',
			title: 'Joy Of Use'
		}
	])

	return (
		<div>
			<section>
				<h2>Overall statistics</h2>
				<p>Total responses: {results.length}</p>
				<p>Responses last month: {results.length}</p>
				<DoughnutStats results={getResults()} />
			</section>

			<section>
				<h2>Last month</h2>
				<p>Total responses: {results.length}</p>
				<p>Responses last month: {results.length}</p>
				<DoughnutStats
					results={getResults(timeFilter(subtractMonths(1)))}
				/>
			</section>
			<section>
				<h2>Last 6 months</h2>
				<p>Total responses: {results.length}</p>
				<p>Responses last month: {results.length}</p>
				<DoughnutStats
					results={getResults(timeFilter(subtractMonths(6)))}
				/>
			</section>
			<section>
				<h2>Last year</h2>
				<p>Total responses: {results.length}</p>
				<p>Responses last month: {results.length}</p>
				<DoughnutStats
					results={getResults(timeFilter(subtractMonths(12)))}
				/>
			</section>

			<section>
				<h2>Department specific statistics</h2>

				<h3>Design</h3>
				<p>
					Total responses:{' '}
					{data.allGoogleSheetFormResponses1Row.edges.length}
				</p>
				<p>
					Responses last month:{' '}
					{data.allGoogleSheetFormResponses1Row.edges.length}
				</p>
				<DoughnutStats
					results={getResults(departmentFilter('Design'))}
				/>

				<h3>Development</h3>
				<p>
					Total responses:{' '}
					{data.allGoogleSheetFormResponses1Row.edges.length}
				</p>
				<p>
					Responses last month:{' '}
					{data.allGoogleSheetFormResponses1Row.edges.length}
				</p>
				<DoughnutStats
					results={getResults(departmentFilter('Development'))}
				/>

				<h3>Management</h3>
				<p>
					Total responses:{' '}
					{data.allGoogleSheetFormResponses1Row.edges.length}
				</p>
				<p>
					Responses last month:{' '}
					{data.allGoogleSheetFormResponses1Row.edges.length}
				</p>
				<DoughnutStats
					results={getResults(departmentFilter('Management'))}
				/>
			</section>
		</div>
	)
}

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
