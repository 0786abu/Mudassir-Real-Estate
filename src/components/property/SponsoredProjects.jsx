import Link from 'next/link'
import React from 'react'

const SponsoredProjects = () => {
  return (

<section className="projects-section py-5">
  <div className="container">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="section-title">Sponsored Projects</h2>
      <Link href="/projects?sponsored=true" className="view-all">View All →</Link>
    </div>
    <div className="row g-4">
      {/* Card 1 */}
      <div className="col-xl-3 col-lg-4 col-md-6">
        <div className="project-card">
          <span className="badge-hot">HOT</span>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" alt="project image" />
          <div className="card-body">
            <h5>Green Heights</h5>
            <p className="price">PKR 2.5 Crore – 5.2 Crore</p>
            <p className="location">Lahore, Gulberg</p>
            <p className="meta">Flats • Offices • Commercial</p>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className="col-xl-3 col-lg-4 col-md-6">
        <div className="project-card">
          <span className="badge-hot">HOT</span>
          <img src="https://images.unsplash.com/photo-1501183638710-841dd1904471" alt="project image" />
          <div className="card-body">
            <h5>Skyline Tower</h5>
            <p className="price">PKR 3.1 Crore – 8.6 Crore</p>
            <p className="location">Islamabad, Blue Area</p>
            <p className="meta">Shops • Flats • Offices</p>
          </div>
        </div>
      </div>
      {/* Card 3 */}
      <div className="col-xl-3 col-lg-4 col-md-6">
        <div className="project-card">
          <span className="badge-hot">HOT</span>
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" alt="project image" />
          <div className="card-body">
            <h5>Emerald Mall</h5>
            <p className="price">PKR 1.2 Crore – 4.9 Crore</p>
            <p className="location">Karachi, DHA</p>
            <p className="meta">Shops • Apartments</p>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-4 col-md-6">
        <div className="project-card">
          <span className="badge-hot">HOT</span>
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" alt="project image" />
          <div className="card-body">
            <h5>Emerald Mall</h5>
            <p className="price">PKR 1.2 Crore – 4.9 Crore</p>
            <p className="location">Karachi, DHA</p>
            <p className="meta">Shops • Apartments</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  )
}

export default SponsoredProjects