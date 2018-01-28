import React from 'react'

import styles from './layout.module.css'

export default ({ children, data }) => (
	<div className={styles.root}>
		<header>
			<h1>{data.site.siteMetadata.title}</h1>
		</header>
		<main>{children()}</main>
	</div>
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
