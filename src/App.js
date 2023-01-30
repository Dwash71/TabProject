import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from 'react-icons/fa';

// Url for retrieving data
const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {

    try {

      const resp = await fetch(url);
      const newJobs = await resp.json();

      // set jobs and set loading
      setJobs(newJobs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchJobs()
  }, []);
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  const { company, dates, duties, title } = jobs[value]
   return (
    <section className='container'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
        <div className="jobs-area">
          {/* button container */}
          <div className="btn-container">
            {jobs.map((job, index) => {
              return (
                <button
                  key={job.id}
                  onClick={() => setValue(index)}
                  className={`job-btn ${index === value && 'active-btn'}`}
                >
                  {job.company}
                  </button>
              )
            })}
          </div>
          {/* job info */}
         <article className="job-details">
           <h3>{title}</h3>
           <h4>{company}</h4>
           <p className="work-date">{dates}</p>
           {duties.map((duty, index) => {
             return (
               <div key={index} className="job-description">
                 <FaAngleDoubleRight className="icon"></FaAngleDoubleRight>
                 <p>{duty}</p>
               </div>
             )
           })}
          </article>
       </div>
       <button type="button" className="btn">More Info</button>
    </section>
  );
}

export default App;
