module.exports = {
	configureWebpack: {
		optimization: {
			minimize: false
		}
	},
	transpileDependencies: ['schemahandler'],
	chainWebpack(config) {
		// config.module.rule('ts').use('ts-loader').loader('ts-loader')
		config.module.rule('ts').use('babel-loader').loader('babel-loader')
	},
}
