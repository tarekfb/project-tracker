import Link from 'next/link';
import { MdAccountCircle, MdCloudDone } from 'react-icons/md';
import { Tooltip } from '@mui/material';
import SyncLoader from 'react-spinners/SyncLoader';
import { useAuthUser } from 'next-firebase-auth';
import { useSavingContext } from '@/contexts/SavingContext';

export function Navbar() {
  const AuthUser = useAuthUser();
  const { isSaving } = useSavingContext();

  return (
    <div className="flex justify-end space-x-4 items-center text-white p-4 pr-4 bg-gradient-main">
      <h1 className="text-4xl mr-auto">
        <Link href="/">
          <a>Project tracker</a>
        </Link>
      </h1>
      <Link href="/auth">
        <a className="flex justify-center items-center space-x-2">
          {AuthUser.id ? (
            <div className="flex items-center space-x-2">
              <MdAccountCircle size={30} title={AuthUser.email} />
              {AuthUser.displayName && <p>{AuthUser.displayName}</p>}
            </div>
          ) : (
            <div>Sign in</div>
          )}
        </a>
      </Link>
      <div className="w-1/12 flex-initial flex flex-row justify-center">
        {isSaving ? (
          <SyncLoader color="#ffffff" size={10} title="Saving to cloud" />
        ) : (
          <MdCloudDone size={30} title="Saved to cloud" />
        )}
      </div>
    </div>
  );
}
