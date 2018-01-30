import React from 'react'

import DoughnutPercentage from '../DoughnutPercentage'
import styles from './styles.module.css'

export default ({ results }) => (
	<div className={styles.root}>
		{results.map(r => (
			<DoughnutPercentage
				percentage={r.value}
				change={r.change}
				title={r.title}
				key={r.title}
			/>
		))}
	</div>
)
