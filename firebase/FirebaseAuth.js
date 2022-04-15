import { init } from "next-firebase-auth";

export const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/home",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    // firebaseAuthEmulatorHost: 'localhost:9099',
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.ADMIN_PRIVATE_KEY,
      },
      databaseURL: "https://" + process.env.PROJECT_ID + ".firebaseio.com",
    },
    firebaseClientInitConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
      appId: process.env.APP_ID,
      databaseURL: "https://" + process.env.PROJECT_ID + ".firebaseio.com",
      // authDomain: process.env.PROJECT_ID + 'PROJECT_ID.firebaseapp.com',
    },
    cookies: {
      name: "project-tracker",
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: false, // set this to false in local (non-HTTPS) development // TODO CHange when deoplyed
      signed: true,
    },
  });
};
