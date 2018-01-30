import React from 'react'

import DoughnutPercentage from '../DoughnutPercentage'
import styles from './styles.module.css'

const displayNumber = num => {
	const toFixed = num.toFixed(1)
	return toFixed[toFixed.length - 1] === '0' ? Math.round(num) : toFixed
}

export default ({ results }) => (
	<div className={styles.root}>
		{results.map(r => (
			<DoughnutPercentage
				percentage={r.value / 5}
				change={r.change}
				description={r.title}
				title={`${displayNumber(r.value)} / 5`}
				key={r.title}
			/>
		))}
	</div>
)
