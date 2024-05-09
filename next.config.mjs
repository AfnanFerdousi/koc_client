import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  images: {
    domains: ["as2.ftcdn.net", "wallpapers.com", "i.ibb.co"],
  },
  webpack: (config, { isServer }) => {
    // Add CSS handling for files from node_modules
    config.module.rules.push({
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader']
    });

    // Set up an alias for the src directory
    config.resolve.alias["@"] = path.resolve(__dirname, "./src");

    return config;
  },
};

export default nextConfig;
