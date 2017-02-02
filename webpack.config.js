var webpack = require("webpack");
var path = require('path');

module.exports = {

	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'build/bundle.js',
        sourceMapFilename: 'build/bundle.map'
	},
	plugins: [
	  new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"})
	],
	devtool: '#source-map',
	module: {
		loaders: [
			{test: /\.js$/, include: path.join(__dirname, 'src'),
				loader: 'babel-loader',
				query:{	presets:['react', 'es2015']}},
			{test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
			{test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,loader: 'url-loader'}
			]
	}
}
