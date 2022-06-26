import React from 'react';
import { Cards } from '../components'

const Projects = () => {
  return (
    <div className="p-3">

        <div className="my-4 d-flex justify-content-between">
          <h3>Projects</h3>
          <button type="button" className="btn btn-primary ps-2 pe-3"><i className="bi bi-plus-lg me-2"></i>Create Project</button>
        </div>
        
        <Cards />
    </div>
  )
}

export default Projects