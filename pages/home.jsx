import Head from 'next/head';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import { Layout } from '@/components/Layout';
import { Loader } from '@/components/Loader';
import { getProjects } from '@/firebase/DbQueries';

const Home = ({ projects }) => {
    const AuthUser = useAuthUser();

    return (
        <Layout>
            <Head>
                <title>Project-tracker | Profile</title>
            </Head>
            HOME PAGE
            <div className="flex flex-col space-y-2 mb-2">
                <p>Your email is: {AuthUser.email ? AuthUser.email : 'unknown'}</p>
                <p>Your id is: {AuthUser.id ? AuthUser.id : 'unknown'}</p>
            </div>
        </Layout>
    );
};

// export const getServerSideProps = withAuthUserTokenSSR()();

// export default withAuthUser({
//     whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
//     whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
//     whenAuthed: AuthAction.RENDER,
//     LoaderComponent: Loader,
// })(Home);


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

