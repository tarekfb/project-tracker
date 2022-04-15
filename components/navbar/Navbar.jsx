import { MdAccountCircle, MdCloudDone, MdHome } from "react-icons/md";
import SyncLoader from "react-spinners/SyncLoader";
import { useAuthUser } from "next-firebase-auth";
import { useSavingContext } from "@/contexts/SavingContext";
import { siteTitle } from "@/components/Layout";
import { NavbarItem } from "./NavbarItem";

export function Navbar() {
  const AuthUser = useAuthUser();
  const { isSaving } = useSavingContext();

  return (
    <div className="flex justify-end space-x-5 items-center text-white p-4 pr-4 bg-gradient-main w-full">
      <NavbarItem href="/" styling="mr-auto">
        <h1 className="text-4xl hover:text-blue-300">{siteTitle}</h1>
      </NavbarItem>
      <NavbarItem href={AuthUser.id ? "/profile" : "/auth"}>
        {AuthUser.id ? (
          <>
            <MdAccountCircle
              size={30}
              title={AuthUser.email}
              className="hover:text-blue-300"
            />
            {AuthUser.displayName && (
              <p className="hover:text-blue-300">{AuthUser.displayName}</p>
            )}
          </>
        ) : (
          <h2 className="text-2xl hover:text-blue-300">Login</h2>
        )}
      </NavbarItem>
      <NavbarItem href="/home">
        <MdHome size={30} className="hover:text-blue-300" />
      </NavbarItem>
      <NavbarItem>
        {isSaving ? (
          <SyncLoader color="#ffffff" size={10} title="Saving to cloud" />
        ) : (
          <MdCloudDone size={30} title="Saved to cloud" />
        )}
      </NavbarItem>
    </div>
  );
}
