// environment.js
// Set this to true in production (Render) and false for local development
const IS_PROD = true;

// Remove extra spaces and trailing slashes for consistency
const server = IS_PROD
  ? "https://tejagpt.onrender.com"   // no trailing slash
  : "http://localhost:8080";         // match your local backend port

export default server;
