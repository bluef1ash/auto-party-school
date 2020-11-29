const path = require("path");

const basePath = path.resolve(__dirname, "..");
console.log(basePath);
console.log(path.join(basePath, "src/renderer/index/index.tsx"));
console.log(path.resolve(__dirname, "../../resources/library/react_devtools"));
