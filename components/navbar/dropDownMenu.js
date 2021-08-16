import { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export function DropDownMenu({ isOpen, projects }) {

  return (
    <div>
      <span>Projects<ArrowDropDownIcon /></span>
      <ul>
        {
          projects.map(project => (
            <li>{project.name}</li>
          ))
        }
      </ul>
    </div>
  )
}
