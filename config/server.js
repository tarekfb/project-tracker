const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://project-tracker-kappa.vercel.app"; //'https://your_deployment.server.com';
