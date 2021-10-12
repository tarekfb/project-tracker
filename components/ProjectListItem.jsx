import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';

export default function ProjectListItem({ project, removeProject, key }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li
      key={key}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}>
      <Link href={`/${encodeURIComponent(project.id)}`}>
        {/* as={{ pathname: `/${project.name}`, query: { id: project.id } }}> */}
        <a>{project.name}</a>
      </Link>
      <DeleteIcon
        aria-label="delete"
        className={`hover:text-blue-300 ${isHovering ? '' : 'hidden'}`}
        onClick={() => {
          removeProject(project.name);
        }}
      />
    </li>
  );
}