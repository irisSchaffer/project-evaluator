import React from 'react'

import DoughnutPercentage from '../components/DoughnutPercentage'
import styles from './index.module.css'

export default ({ data }) => (
	<div>
		<ul>
			{data.allGoogleSheetFormResponses1Row.edges.map(({ node }) => (
				<li>
					{node.projectName} - {node.projectDuration} -{' '}
					{node.projectCompletionDate} - {node.department}
				</li>
			))}
		</ul>
		<section className={styles.statistics}>
			<DoughnutPercentage percentage={0.15} title="Overall Enjoyment" />
			<DoughnutPercentage percentage={0.45} title="Avg. Learning Rate" />
			<DoughnutPercentage percentage={0.9} title="Avg. Proudness" />
		</section>
	</div>
)

export const query = graphql`
	query StartPageQuery {
		allGoogleSheetFormResponses1Row {
			edges {
				node {
					timestamp
					projectName
					projectDuration
					projectCompletionDate
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
