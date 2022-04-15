import Link from 'next/link';

const containerStyle = "flex flex-row items-center justify-center space-x-1";

export const NavbarItem = ({ children, href, styling }) => {
    return (
        <>
            {
                href ?
                    <Link href={href}>
                        <a className={`${styling && styling} ${containerStyle}`}>
                            {children}
                        </a>
                    </Link>
                    :
                    <div className={`${styling && styling} ${containerStyle}`}>
                        {children}
                    </div>
            }
        </>
    );
}