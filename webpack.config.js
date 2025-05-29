import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./.env" });

export default {
  mode: "development", // specififc to Webpack
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // specific to JS
      DEBUG: true,
    }),
    new webpack.DefinePlugin({
      fsConstants: 'require("node:fs").constants', // Define fsConstants globally
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env), // Define process.env globally
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"), // Copy everything
          to: ".",
        },
      ],
    }),
  ],
  entry: path.resolve(__dirname, "./src/main.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Clean the dist directory before building
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],

    alias: {
      icons: path.resolve(__dirname, 'public/icons'),
      components: path.resolve(__dirname, "src/components"),
      constants: path.resolve(__dirname, "src/constants"),
      contexts: path.resolve(__dirname, "src/contexts"),
      customhooks: path.resolve(__dirname, "src/customHooks"),
      interfaces: path.resolve(__dirname, "src/interfaces"),
      layouts: path.resolve(__dirname, "src/layouts"),
      pages: path.resolve(__dirname, "src/pages"),
      services: path.resolve(__dirname, "src/services"),
      // 'node:fs/promises': 'node:fs', // Redirect 'node:fs/promises' to 'node:fs'
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname), // Serve files from the project root
    },
    compress: true, // Enable gzip compression
    historyApiFallback: true, // Serve index.html for SPA routes
  },
};
