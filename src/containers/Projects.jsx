import React from 'react';
import { Cards } from '../components'

const Projects = () => {
  return (
    <React.Fragment>
        <h3>Projects</h3>
        <button type="button" className="btn btn-primary ps-2 pe-3"><i className="bi bi-plus-lg"></i>Create Project</button>

        <Cards />
    </React.Fragment>
  )
}

export default Projects