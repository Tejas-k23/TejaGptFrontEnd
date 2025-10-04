const IS_PROD = true;

const server = IS_PROD
  ? "https://tejagpt.onrender.com"   // no trailing slash
  : "http://localhost:8080";

export default server;
