import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';

export default function ProjectListItem({ project, removeProject }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li
      key={project.id}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}>
      <Link href={`/${project.id}`}>
        {/* as={{ pathname: `/${project.name}`, query: { id: project.id } }}> */}
        <a>{project.name}</a>
      </Link>
      <button
        className={`hover:text-blue-300 ${isHovering ? '' : 'hidden'}`}
        onClick={() => {
          removeProject(project.name);
        }}>
        <DeleteIcon />
      </button>
    </li>
  );
}
