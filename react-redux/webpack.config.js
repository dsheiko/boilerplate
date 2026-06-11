const { join } = require("path");

const SRC_FULL_PATH = join(__dirname, "./src/");
const PUBLIC_PATH = "./build/";
const PUBLIC_FULL_PATH = join(__dirname, PUBLIC_PATH);

module.exports = {
  mode: "development",

  watchOptions: {
    ignored: /node_modules/
  },

  entry: {
    index: join(SRC_FULL_PATH, "index.jsx")
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
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: ">1%, last 2 versions, Firefox ESR" }],
              ["@babel/preset-react", { runtime: "automatic" }]
            ],
            plugins: [
              "@babel/plugin-transform-class-properties"
            ]
          }
        }
      }
    ]
  }
};
