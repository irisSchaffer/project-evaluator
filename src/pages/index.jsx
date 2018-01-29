import React from 'react'

import DoughnutPercentage from '../components/DoughnutPercentage'
import styles from './index.module.css'

export default ({ data }) => (
	<div>
		<section>
			<h2>Overall statistics</h2>
			<p>
				Total responses:{' '}
				{data.allGoogleSheetFormResponses1Row.edges.length}
			</p>
			<p>
				Responses last month:{' '}
				{data.allGoogleSheetFormResponses1Row.edges.length}
			</p>
			<div className={styles.statistics}>
				<DoughnutPercentage
					percentage={0.15}
					change={-0.15}
					title="Overall Enjoyment"
				/>
				<DoughnutPercentage
					percentage={0.45}
					change={-0.1}
					title="Avg. Learning Rate"
				/>
				<DoughnutPercentage
					change={-0.05}
					percentage={0.9}
					title="Avg. Proudness"
				/>
			</div>
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
			<div className={styles.statistics}>
				<DoughnutPercentage
					percentage={0.24}
					change={0.15}
					title="Overall Enjoyment"
				/>
				<DoughnutPercentage
					percentage={0.45}
					change={0.07}
					title="Avg. Learning Rate"
				/>
				<DoughnutPercentage
					percentage={0.9}
					change={0.2}
					title="Avg. Proudness"
				/>
			</div>

			<h3>Development</h3>
			<p>
				Total responses:{' '}
				{data.allGoogleSheetFormResponses1Row.edges.length}
			</p>
			<p>
				Responses last month:{' '}
				{data.allGoogleSheetFormResponses1Row.edges.length}
			</p>
			<div className={styles.statistics}>
				<DoughnutPercentage
					percentage={0.15}
					title="Overall Enjoyment"
				/>
				<DoughnutPercentage
					percentage={0.45}
					title="Avg. Learning Rate"
				/>
				<DoughnutPercentage percentage={0.9} title="Avg. Proudness" />
			</div>

			<h3>Management</h3>
			<p>
				Total responses:{' '}
				{data.allGoogleSheetFormResponses1Row.edges.length}
			</p>
			<p>
				Responses last month:{' '}
				{data.allGoogleSheetFormResponses1Row.edges.length}
			</p>
			<div className={styles.statistics}>
				<DoughnutPercentage
					percentage={0.15}
					title="Overall Enjoyment"
				/>
				<DoughnutPercentage
					percentage={0.45}
					title="Avg. Learning Rate"
				/>
				<DoughnutPercentage percentage={0.9} title="Avg. Proudness" />
			</div>
		</section>
	</div>
)

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
