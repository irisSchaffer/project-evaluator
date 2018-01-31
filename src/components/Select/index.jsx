import React from 'react'

import styles from './index.module.css'

export default ({ label, options, value, name, onChange, className }) => (
	<label htmlFor={name} className={className}>
		<span className={styles.label}>{label}</span>
		<select
			className={styles.select}
			id={name}
			name={name}
			value={value}
			onChange={onChange}
		>
			{options.map(option => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</select>
	</label>
)
