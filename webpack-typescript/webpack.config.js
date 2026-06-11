const { join } = require("path"),
      SRC_FULL_PATH = join(__dirname, "./src/"),
      PUBLIC_PATH = "./build/",
      PUBLIC_FULL_PATH = join(__dirname, PUBLIC_PATH);

module.exports = {
    mode: "development",

    entry: {
      index: join(SRC_FULL_PATH, "index.ts")
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
      extensions: [".ts", ".js"]
    },

    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    }
};
