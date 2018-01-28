/* eslint-disable global-require */
const variables = require('./variables')

module.exports = {
	plugins: [
		require('postcss-strip-inline-comments'),
		require('postcss-cssnext')({
			features: {
				customProperties: {
					variables: variables.customProperties
				},
				customMedia: {
					extensions: variables.customMedia
				}
			}
		}),
		require('autoprefixer')({
			browsers: ['last 2 versions']
		})
	]
}
