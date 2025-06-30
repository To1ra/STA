// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add wasm asset support
config.resolver.sourceExts.push("cjs", "mjs");
config.resolver.assetExts.push("wasm");

// Enhanced middleware for SharedArrayBuffer support
config.server.enhanceMiddleware = (middleware, server) => {
  return (req, res, next) => {
    // Set headers for SharedArrayBuffer support
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

    // Call the original middleware
    return middleware(req, res, next);
  };
};

// Temporary fix for ENOENT <anonymous> error
if (process.env.NODE_ENV === "development") {
  config.transformer = {
    ...config.transformer,
    minifierConfig: {
      keep_fnames: true,
      mangle: {
        keep_fnames: true,
      },
    },
  };
}

module.exports = config;
