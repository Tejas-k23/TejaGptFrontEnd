const IS_PROD = true;

const server = (IS_PROD 
  ? "https://tejagpt.onrender.com" 
  : "http://localhost:8080"
).replace(/\/$/, ""); // removes any trailing slash

export default server;
