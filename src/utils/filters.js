import { addMonths } from './date'

export const departmentFilter = department => r => r.department === department

export const timeFilter = (start, end = new Date()) => r =>
	r.completionDate >= start && r.completionDate <= end

export const combine = (...filters) => r =>
	filters.reduce((acc, fn) => acc && fn(r), true)

export const subtractMonths = months => addMonths(new Date())(0 - months)
