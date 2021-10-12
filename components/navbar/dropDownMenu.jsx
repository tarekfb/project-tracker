import { useState } from 'react';
import Link from 'next/link';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ClipLoader } from 'react-spinners';

export function DropDownMenu({ projects }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="p-2.5 hover:bg-black rounded-md "
      onMouseOver={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}>
      <span className="">
        Projects
        <ArrowDropDownIcon />
      </span>
      <ul className={`absolute pt-3 pl-2.5 pr-8 rounded-md bg-black ${isOpen ? '' : 'hidden'}`}>
        {projects ? (
          projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className="pb-2 hover:text-blue-300 rounded-md whitespace-nowrap">
                <Link href={'/' + project.id}>
                  <a>{project.name}</a>
                </Link>
              </li>
            ))
          ) : (
            <li className="pr-4 pl-4 pb-2 bg-prussianBlue whitespace-nowrap">No projects</li>
          )
        ) : (
          <ClipLoader />
        )}
      </ul>
    </div>
  );
}
