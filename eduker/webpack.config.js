const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Dẫn tới file index.js ta đã tạo
  output: {
    path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
    filename: "bundle.js", // Tên file được build ra
 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ["babel-loader"]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/, 
        use: ["json-loader"]
      },
      // { 
      //   test: /\.(jpg|png|woff|woff2|eot|ttf)$/, 
      //   use: 'file?name=assets/[name].[hash].[ext]'
      // },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader']
      },
      // {
      //   test: /\.svg$/,
      //   exclude: /node_modules/,
      //   use: ["@svgr/webpack"],
      // },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ["svg-inline-loader"],
      },
      {
        test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: ['url?limit=10000&mimetype=application/font-woff']
      },
      
    ]
    
  },
  
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    
  ],
  devServer: {
    hot: true,
    liveReload: true,
    port: 3000,
    historyApiFallback: true,
    allowedHosts: "all"
  },
  
};

