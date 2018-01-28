import React from 'react'

import styles from './styles.module.css'

export default ({ percentage, title }) => {
	const percent = percentage * 100

	return (
		<figure className={styles.root}>
			<div className={styles.chart}>
				<svg viewBox="0 0 42 42">
					<circle
						className={styles.doughnutHole}
						cx="21"
						cy="21"
						r="15.91549430918954"
						fill="#fff"
					/>
					<circle
						className={styles.doughnutRing}
						cx="21"
						cy="21"
						r="15.91549430918954"
						fill="transparent"
						stroke="#d2d3d4"
						strokeWidth="3"
					/>

					<circle
						className={styles.doughnutSegment}
						cx="21"
						cy="21"
						r="15.91549430918954"
						fill="transparent"
						stroke="#ce4b99"
						strokeWidth="3"
						strokeDasharray={`${percent} ${100 - percent}`}
						strokeDashoffset="25"
					/>
				</svg>
				<span className={styles.percent}>{percent}%</span>
			</div>
			<figcaption className={styles.caption}>{title}</figcaption>
		</figure>
	)
}
