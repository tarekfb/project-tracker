import { useState } from 'react';
import Link from 'next/link'
import { DropDownMenu } from './dropDownMenu';

export function Navbar({ }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  // This is a temporary solution
  // This function has been done in other places. Primarily in projects.js.
  // Currently no db, but local file system.
  // When db, use db instead.
  // Or context?
  
  useEffect(() => {
    async function initProjects() {
      let req = await fetch('http://localhost:3000/projects.json');
      let data = await req.json();

      let projects = [];
      data.forEach(element => {
        let project = {};
        project.name = element;
        projects.push(project);
      });
      setProjects(projects);
    }

    initProjects();
  }, []);

  return (
    <div className="container flex justify-end space-x-4">
      <h1 className="text-4xl mr-auto">
        <Link href="/">
          <a>Project tracker</a>
        </Link>
      </h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <DropDownMenu projects={projects} isOpen={isOpen}>

      </DropDownMenu>
    </div>
  )
}
