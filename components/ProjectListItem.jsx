import { useState } from 'react';
import Link from 'next/link';
import { MdDelete, MdLink } from 'react-icons/md';
import { AiFillGithub, AiFillStar } from 'react-icons/ai';

export function ProjectListItem({ project, removeProject }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li
      className="max-h-40 max-w-xs w-60 relative flex flex-col items-center justify-start flex-wrap space-y-1 border-2 border-highlight w-30 overflow-hidden py-2 px-4 rounded-md"
      key={project.id}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <button
        className={`absolute top-2 right-2 hover:text-blue-400 ${isHovering ? '' : 'hidden'}`}
        onClick={() => {
          removeProject(project.name);
        }}>
        <MdDelete size={25}
          aria-label="delete"
        />
      </button>
      <Link href={`/${encodeURIComponent(project.id)}`}>
        <a className="text-center">
          <h1 className="text-lg lg:text-xl whitespace-nowrap overflow-ellipsis overflow-hidden w-44">{project.name}</h1>
        </a>
      </Link>
      <p>Started: {project.startDate}</p>
      <div className="flex space-x-2 place-items-center mt-auto">
        {project.github && <AiFillGithub />}
        {project.hostedAt && <MdLink />}
        {true && <AiFillStar className='text-yellow-600 ml-auto' />}
      </div>
    </li>
  );
}
