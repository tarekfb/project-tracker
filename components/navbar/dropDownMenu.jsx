import { useState } from 'react';
import Link from 'next/link';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
      <span>
        Projects
        <ArrowDropDownIcon />
      </span>
      <ul className={`absolute pt-3 ${isOpen ? '' : 'hidden'}`}>
        {projects.map((project, i) => (
          <li
            key={i}
            className="pr-4 pl-4 pb-2 bg-prussianBlue hover:text-blue-400 whitespace-nowrap">
            <Link href={'/' + project.name}>
              <a>- {project.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
