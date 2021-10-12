import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';
import { useProjectContext } from '../contexts/ProjectContext';
import { useSavingContext } from '../contexts/SavingContext';
import firebase from '../../firebase/FirebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CloudDone, AccountCircle } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import SyncLoader from 'react-spinners/SyncLoader';

export function Navbar() {
  const { projects } = useProjectContext();
  const { isSaving } = useSavingContext();

  const auth = firebase.auth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="flex justify-end space-x-4 items-center text-white p-4 pr-4 bg-gradient-to-r from-black to-indigo-800">
      <h1 className="text-4xl mr-auto">
        <Link href="/">
          <a>Project tracker</a>
        </Link>
      </h1>
      <Link href="/auth">
        <a>
          <AccountCircle />
        </a>
      </Link>
      {loading ? <div>loading...</div> : user ? <div>auth</div> : <div>not auth</div>}
      <DropDownMenu projects={projects} />
      <div className="w-1/12 flex-initial flex flex-row justify-center">
        {isSaving ? (
          <SyncLoader color="#ffffff" size={10} />
        ) : (
          <Tooltip title="Saved to cloud">
            <CloudDone fontSize="large" />
          </Tooltip>
        )}
      </div>
    </div>
  );
}
