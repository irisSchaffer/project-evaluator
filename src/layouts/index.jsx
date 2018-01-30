import React from 'react'

import styles from './layout.module.css'

export default ({ children, data }) => (
	<main className={styles.root}>
		{children()}
	</main>
)

export const query = graphql`
	query LayoutQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`
