import Head from "next/head";
import Link from "next/link";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import { Layout } from "@/components/Layout";
import { Loader } from "@/components/Loader";
import { getProjects } from "@/firebase/DbQueries";
import { PrimaryButton } from "@/components/PrimaryButton";

const Home = ({ projects }) => {
  const AuthUser = useAuthUser();

  return (
    <Layout>
      <Head>
        <title>Project-tracker | Home</title>
      </Head>
      HOME PAGE
      <PrimaryButton
        content="Log projects"
        onClick={() => console.log(projects)}
      />
      <div className="flex flex-col space-y-2 mb-2">
        <p>Your email is: {AuthUser.email ? AuthUser.email : "unknown"}</p>
        <p>Your id is: {AuthUser.id ? AuthUser.id : "unknown"}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <Link href="/projects">
          <a>-projects</a>
        </Link>
        <Link href="/profile">
          <a>-profile</a>
        </Link>
        <Link href="/auth">
          <a>-auth</a>
        </Link>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
  LoaderComponent: Loader,
})(async ({ AuthUser }) => {
  const data = await getProjects(AuthUser.id);
  return {
    props: {
      projects: data,
    },
  };
});

export default withAuthUser()(Home);
