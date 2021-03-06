import React from 'react'

import { customProperties } from '../../../data/variables'
import styles from './index.module.css'

export default ({ percentage, title, change = null, description }) => {
	const color =
		percentage <= 0.33
			? 'failure'
			: percentage <= 0.67 ? 'warning' : 'success'

	const absChange = Math.abs(change * 100)
	const percent = percentage * 100

	return (
		<figure className={styles.root}>
			<div className={styles.chart}>
				<svg viewBox="0 0 42 42">
					<circle
						className={styles.doughnutRing}
						cx="21"
						cy="21"
						r="15.91549430918954"
						fill="transparent"
						strokeWidth="3"
					/>

					<circle
						className={styles.doughnutPercent}
						cx="21"
						cy="21"
						r="15.91549430918954"
						fill="transparent"
						stroke={customProperties[color]}
						strokeWidth="3"
						strokeDasharray={`${percent} ${100 - percent}`}
						strokeDashoffset="25"
					/>
					{change && (
						<circle
							className={styles.doughnutChange}
							cx="21"
							cy="21"
							r="15.91549430918954"
							fill="transparent"
							stroke={
								change > 0
									? customProperties[`${color}Dark`]
									: customProperties[`${color}Light`]
							}
							strokeWidth="3"
							strokeDasharray={`${absChange} ${100 - absChange}`}
							strokeDashoffset={
								25 - percent + (change > 0 ? absChange : 0)
							}
						/>
					)}
				</svg>
				<span className={styles.percent}>{title || `${Math.round(percent)}%`}</span>
				<span className={styles.change}>
					{change &&
						`${change > 0 ? '+' : ''}${Math.round(change * 100)}%`}
				</span>
			</div>
			<figcaption className={styles.caption}>{description}</figcaption>
		</figure>
	)
}
