const postcss = require('./data/postcss')
const siteConfig = require('./data/siteConfig')

module.exports = {
	siteMetadata: {
		title: siteConfig.title
	},
	plugins: [
		'gatsby-plugin-react-next',
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography.js`
			}
		},
		{
			resolve: 'gatsby-source-google-sheets',
			options: {
				spreadsheetId: '1r8EcVPOl3qdogFPxtSTrdumCeWAs_Abqyn5EXcnVOoM',
				worksheetTitle: 'Form responses 1',
				credentials: require('./google-credentials.json') // eslint-disable-line global-require
			}
		},
		{
			resolve: `gatsby-plugin-postcss-sass`,
			options: {
				postCssPlugins: postcss.plugins,
				precision: 8
			}
		}
	]
}
