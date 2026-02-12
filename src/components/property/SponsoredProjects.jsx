import { formatPK } from '@/utils/Formatter';
import { GetSponsoredProjects } from '@/utils/HomePageValues';
import Link from 'next/link'
import React from 'react'

const SponsoredProjects = async() => {
  const projects = await GetSponsoredProjects();
  return (

<section className="projects-section pt-4 pb-2">
  <div className="container">
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="section-title text-black" style={{fontSize:"22px"}}>Sponsored Projects</h2>
      <Link href="/projects?sponsored=true" className="view-all">View All →</Link>
    </div>
    <div className="row g-4"> 
      {/* Card 1 */}
      {projects?.map((project,index)=>{
      return  <div key={index} className="col-xl-3 col-lg-4 col-md-6">
             <Link className='text-black' href={`/projects/${project?.slug}`}>
          <div className="project-card">
          <span className="badge-hot">HOT</span>
          <img src={project?.images[0]?.url} alt="project image" />
          <div className="card-body">
            <h5 className='line-clamp-1'>{project?.projectTitle}</h5>
            <p className="price rounded-2 d-inline-block" style={{fontSize:"13px"}}>PKR {formatPK(project?.minItemPrice)} – {formatPK(project?.maxItemPrice)}</p>
            <p className="location">{project?.city}, {project?.location}</p>
            <p className="meta">
  {project?.offering?.slice(0,3)?.map((item, i) => (
    <span key={i}>
      {item}
      {i !== project.offering.length - 1 && " • "}
    </span>
  ))}
</p>

          </div>
        </div>
  </Link>
      </div>
      })}
    </div>
  </div>
</section>


  )
}

export default SponsoredProjects