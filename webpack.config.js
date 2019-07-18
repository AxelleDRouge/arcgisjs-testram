const ArcGISPlugin = require("@arcgis/webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    publicPath: ""
  },

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // Inline files smaller than 10 kB (10240 bytes)
              limit: 10 * 1024,
            }
          }
        ]
      },
      {
        test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "build/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new ArcGISPlugin({
      useDefaultAssetLoaders: false
    }),
    new HtmlWebPackPlugin({
      title: "ArcGIS Template Application",
      template: "./src/index.html",
      filename: "./index.html",
      chunksSortMode: "none",
      inlineSource: ".(css)$"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  resolve: {
    modules: [path.resolve(__dirname, "/src"), "node_modules/"],
    extensions: [".js", ".scss"]
  },

  externals: [
    (context, request, callback) => {
      if (/pe-wasm$/.test(request)) {
        return callback(null, "amd " + request);
      }
      callback();
    }
  ],
  //decommenter cette partie pour accéder au code meme en mode production
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  devtool: 'source-map',
  node: {
    process: false,
    global: false,
    fs: 'empty'
  }
};