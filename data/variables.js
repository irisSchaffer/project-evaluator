const customProperties = {
	white: '#FFF',
	lightestGray: '#FAFAFA',
	lightGray: '#F7F7F7',
	gray: '#717171',
	darkGray: '#3D3D3D',
	swatchPrimary: '#EF4F47',
	swatchBody: 'var(--white)',
	swatchFont: 'var(--darkGray)',
	swatchPrimaryHighlight: '#FBCAC8',

	successLight: 'rgb(209, 244, 226)',
	success: 'rgb(5, 196, 107)',
	successDark: 'rgb(19, 142, 84)',

	failureLight: 'rgb(255, 223, 222)',
	failure: 'rgb(255, 94, 87)',
	failureDark: 'rgb(212, 36, 26)',

	warningLight: 'rgb(255, 243, 196)',
	warning: 'rgb(255, 211, 42)',
	warningDark: 'rgb(232, 185, 0)',

	widthMobile: 767,
	widthTablet: 991,
	widthDesktop: 1199
}

const customMedia = {
	'--mobile': `only screen and (max-width : ${
		customProperties.widthMobile
	}px)`,
	'--tablet': `only screen and (min-width : ${customProperties.widthMobile +
		1}px) and (max-width : ${customProperties.widthTablet}px)`,
	'--tabletUp': `only screen and (min-width : ${customProperties.widthMobile +
		1}px)`,
	'--tabletDown': `only screen and (max-width : ${
		customProperties.widthTablet
	}px)`,
	'--desktop': `only screen and (min-width : ${customProperties.widthTablet +
		1}px) and (max-width : ${customProperties.widthDesktop}px)`,
	'--desktopUp': `only screen and (min-width : ${customProperties.widthTablet +
		1}px)`,
	'--desktopDown': `only screen and (max-width : ${
		customProperties.widthDesktop
	}px)`,
	'--desktopBig': `only screen and (min-width : ${customProperties.widthDesktop +
		1}px)`
}

module.exports = {
	customProperties,
	customMedia
}
