const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    main: {
      import: "./src/app.js",
      dependOn: "shared",
    },
    aModule: {
      import: "./src/another-module.js",
      dependOn: "shared",
    },
    // hello: {
    //   import: './src/hello.js',
    //   dependOn: 'shared',
    // },
    shared: ["bootstrap", "vanilla-tilt"],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.[contenthash].css",
    }),
  ],
};
