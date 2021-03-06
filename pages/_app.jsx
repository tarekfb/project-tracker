import "../styles/global.css";
import { SavingContextProvider } from "components/contexts/SavingContext";
import { BlurContextProvider } from "components/contexts/BlurContext";
import { initAuth } from "@/firebase/FirebaseAuth";

initAuth();

function MyApp({ Component, pageProps }) {
  return (
    <BlurContextProvider>
      <SavingContextProvider>
        <Component {...pageProps} />
      </SavingContextProvider>
    </BlurContextProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
