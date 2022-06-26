// import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = "https://wavescan-frontend-assessment.saurabhmudgal.repl.co/";

const Cards = () => {

  const [data, setData] = useState(null); // store the data
  
  // if the data dosen't load
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // data fetching here
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setData(response.data); // store the data into the state
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

  const CardGroup = () => (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
      {data.map((p) => (
        <div className="col">
          <div className="project-card card shadow border-0 h-100">
            <div className="img">
              <img src={p.img} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <h5 className="card-title">{p.title}</h5>
              {p.tags.map( (tag) => (
                <span className="tags badge rounded-pill me-1">{tag}</span>
              ))}
              <p className="card-text mt-3">{p.description}</p>
              {/* <a href="..." className="btn btn-primary btn-sm">View More</a> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <React.Fragment>
       {loading && <div>Loading data...</div>}
       {error && (<div>{`There is a problem fetching the data - ${error}`}</div>)}
       {data && <CardGroup />}
    </React.Fragment>
  )
}

export default Cards