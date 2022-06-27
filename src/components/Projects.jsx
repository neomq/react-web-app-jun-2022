import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "react-widgets/styles.css";
import Multiselect from "react-widgets/Multiselect";

const URL = "https://wavescan-frontend-assessment.saurabhmudgal.repl.co/";

const Projects = () => {

  const [data, setData] = useState(null); // store the data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tags, setTags] = useState([]); // store list of tags

  const [searchInput, setSearchInput] = useState(''); // store keywaord search value
  const [filteredResults, setFilteredResults] = useState([]); // store filtered data (search results)

  const [filteredTags, setFilteredTags] = useState([]); // store selected tags to filter

  useEffect(() => {
    // data fetching here
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setData(response.data); // store the data into the state

        let tags = [];
        for (let d of response.data) {
          for (let tag of d.tags) {
            if (tags.includes(tag) === false) {
              tags.push(tag)
            }
          }
        }
        setTags(tags); // store the tags data into the state

        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const searchTags = () => {
      if (filteredTags.length !== 0) {
        const filterByTags = ( list , filters ) => {
          return list.filter( item => filters.every( filter => item.tags.includes(filter) ))
        }
        setFilteredResults( filterByTags(data, filteredTags) )
      } else {
        setFilteredResults(data)
      }
    }
    searchTags();
  }, [filteredTags])

  const CardGroup = () => (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {searchInput.length >= 3 || filteredTags.length !== 0 ? (
        filteredResults.map((p) => (
            <div className="col">
              <div className="project-card card shadow border-0 h-100">
                <div className="img">
                  <img src={p.img} className="card-img-top" alt="..." />
                </div>
                <div className="card-body p-4">
                  <h5 className="card-title mb-3">{p.title}</h5>
                  {p.tags.map( (tag) => (
                    <span className="tags badge rounded-pill me-1">{tag}</span>
                  ))}
                  <p className="card-text mt-3">{p.description}</p>
                </div>
              </div>
            </div>
          ))
      ) : (
        data.map((p) => (
            <div className="col">
              <div className="project-card card shadow border-0 h-100">
                <div className="img">
                  <img src={p.img} className="card-img-top" alt="..." />
                </div>
                <div className="card-body p-4">
                  <h5 className="card-title mb-3">{p.title}</h5>
                  {p.tags.map( (tag) => (
                    <span className="tags badge rounded-pill me-1">{tag}</span>
                  ))}
                  <p className="card-text mt-3">{p.description}</p>
                </div>
              </div>
            </div>
          ))
      )}
    </div>
  )

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const clearFilter = () => {
    setFilteredTags([])
  }

  return (
    <div className="row container-fluid m-0">
      <div className="col-12">
        <div className="header px-2 my-4 d-flex justify-content-between align-items-center">
          <h1 className="display-5 m-0">Projects</h1>
          <div>
            <button type="button" className="btn rounded-pill ps-3 pe-4 py-2 shadow-sm"><i className="bi bi-plus-lg me-2"></i>Create Project</button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-3 mb-5">
        <div className="px-2">
          <ul class="nav nav-pills mb-4" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" 
                      id="pills-search-tab" 
                      data-bs-toggle="pill" 
                      data-bs-target="#pills-search" 
                      type="button" 
                      role="tab" 
                      aria-controls="pills-home" 
                      aria-selected="true">
                      Search
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link"
                      id="pills-filter-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-filter"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                      onClick={() => clearFilter()}>
                      Filter
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            {/* Search Bar */}
            <div class="tab-pane fade show active" id="pills-search" role="tabpanel" aria-labelledby="pills-search-tab" tabIndex="0">
              <div className="search-bar d-flex align-items-center border rounded-2">
                <i className="bi bi-search ms-3"></i>
                <input className="form-control bg-transparent me-2 border-0"
                  type="search"
                  placeholder="Search.."
                  aria-label="Search"
                  onChange={(e) => searchItems(e.target.value)} />
              </div>
            </div>
            
            {/* Filter Dropdown */}
            <div class="tab-pane fade" id="pills-filter" role="tabpanel" aria-labelledby="pills-filter-tab" tabIndex="0">
              <div className="mt-3">
                <Multiselect data={tags}
                  value={filteredTags}
                  placeholder={"Select Categories"}
                  onChange={value => { setFilteredTags(value) }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-9">
        <div className="px-2">
          {loading && <div>Loading data...</div>}
          {error && (<div>{`There is a problem fetching the data - ${error}`}</div>)}
          {data && <CardGroup />}
        </div>
      </div>
    </div>
  )
}

export default Projects