import { useState } from 'react';
import Link from 'next/link'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export function DropDownMenu({ projects }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseOver={() => { setIsOpen(true) }}
      onMouseLeave={() => { setIsOpen(false) }} >
      <span>Projects<ArrowDropDownIcon /></span>
      <ul className={`absolute ${isOpen ? "" : "hidden"}`}>
        {
          projects.map((project, i) => (
            <li key={i} className="hover:text-blue-400 whitespace-nowrap">
              <Link href={"/" + project.name}>
                <a>- {project.name}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
