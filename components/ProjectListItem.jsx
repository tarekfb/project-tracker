import { useState } from 'react';
import Link from 'next/link';
import { MdDelete, MdLink } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai'

export function ProjectListItem({ project, removeProject }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li className="h-full relative flex flex-col items-center justify-start flex-wrap space-y-1 border border-black w-30 overflow-hidden py-2 px-4 rounded-md"
      key={project.id}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <MdDelete
        aria-label="delete"
        className={`absolute top-2 right-2 hover:text-blue-400 ${isHovering ? '' : 'hidden'}`}
        onClick={() => {
          removeProject(project.name);
        }}
      />
      <Link href={`/${encodeURIComponent(project.id)}`}>
        <a className="text-center">
          <h1 className='text-2xl'>{project.name}</h1>
        </a>
      </Link>
      {project.completion && <p>Completion: {project.completion}</p>}
      <p>Started: {project.startDate}</p>
      {project.notes && <p className='max-h-16 text-ellipsis overflow-hidden'>{project.notes}</p>}
      <div className="flex space-x-2 place-items-center mt-auto">
        {project.github && <AiFillGithub />}
        {project.hostedAt && <MdLink />}
      </div>

    </li>
  );
}
