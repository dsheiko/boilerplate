const { join } = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const SRC_FULL_PATH = join(__dirname, "./src/");
const PUBLIC_PATH = "./build/";
const PUBLIC_FULL_PATH = join(__dirname, PUBLIC_PATH);

module.exports = {
  mode: "development",

  watchOptions: {
    ignored: /node_modules/
  },

  entry: {
    index: join(SRC_FULL_PATH, "main.js")
  },
  output: {
    path: PUBLIC_FULL_PATH,
    filename: "[name].js",
    chunkFilename: "[name].widget.js",
    publicPath: PUBLIC_PATH,
    clean: true
  },

  resolve: {
    modules: [
      "node_modules",
      SRC_FULL_PATH
    ],
    extensions: [".js", ".vue"]
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: ">1%, last 2 versions, Firefox ESR" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource"
      }
    ]
  },

  plugins: [new VueLoaderPlugin()]
};
