import { useState } from 'react';
import Link from 'next/link';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ClipLoader } from 'react-spinners';

export function DropDownMenu({ projects }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-prussianBlue"
      onMouseOver={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}>
      <span className="hover:text-blue-400">
        Projects
        <ArrowDropDownIcon />
      </span>
      <ul className={`absolute pt-3 ${isOpen ? '' : 'hidden'}`}>
        {projects ? (
          projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className="pr-4 pl-4 pb-2 bg-prussianBlue hover:text-blue-400 whitespace-nowrap">
                <Link href={'/' + project.id}>
                  <a>- {project.name}</a>
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
