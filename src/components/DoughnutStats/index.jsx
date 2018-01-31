import React from 'react'

import DoughnutChart from '../DoughnutChart'
import styles from './index.module.css'

const displayNumber = num => {
	const toFixed = num.toFixed(1)
	return toFixed[toFixed.length - 1] === '0' ? Math.round(num) : toFixed
}

export default ({ results }) => (
	<div className={styles.root}>
		{results.map(r => (
			<DoughnutChart
				percentage={r.value / 5}
				change={r.change && r.change / 5}
				description={r.title}
				title={`${displayNumber(r.value)} / 5`}
				key={r.title}
			/>
		))}
	</div>
)
