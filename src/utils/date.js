export const addMonths = date => amountMonths => {
	const tempDate = new Date(date)
	tempDate.setMonth(tempDate.getMonth() + amountMonths)

	return tempDate
}
