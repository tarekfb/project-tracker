import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import Link from 'next/link';

export function ProjectListItem({ project, removeProject }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li
      key={project.id}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <Link href={`/${encodeURIComponent(project.id)}`}>
        <a>{project.name}</a>
      </Link>
      <Delete
        aria-label="delete"
        className={`hover:text-blue-300 ${isHovering ? '' : 'hidden'}`}
        onClick={() => {
          removeProject(project.name);
        }}
      />
    </li>
  );
}
