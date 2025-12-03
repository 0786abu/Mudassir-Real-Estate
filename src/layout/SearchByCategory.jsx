import React from "react";
import { Container } from "reactstrap";

// css available on about.scss

const categories = [
  { img: "/assets/images/category-1.png", title: "Houses" },
  { img: "/assets/images/category-2.png", title: "Apartments and Flats" },
  { img: "/assets/images/category-1.png", title: "Portions & Floors" },
  { img: "/assets/images/category-1.png", title: "Shops" },
  { img: "/assets/images/category-1.png", title: "Roommates & Paying Guest" },
  { img: "/assets/images/category-1.png", title: "Vacation Rentals - Guest Houses" },
  { img: "/assets/images/category-1.png", title: "Rooms" },
  { img: "/assets/images/category-1.png", title: "Commercial Plots" },
  { img: "/assets/images/category-1.png", title: "Residential Plots" },
  { img: "/assets/images/category-1.png", title: "Industrial Plots" },
  { img: "/assets/images/category-1.png", title: "Agricultural Land" },
  { img: "/assets/images/category-1.png", title: "Plot Form" },
  { img: "/assets/images/category-1.png", title: "Building" },
  { img: "/assets/images/category-1.png", title: "Office" },
  { img: "/assets/images/category-1.png", title: "Factory" },
  { img: "/assets/images/category-1.png", title: "Warehouse" },
];

const CategorySection = () => {
  return (
    <section style={{padding:"0px", marginTop:"80px", marginBottom:"0px"}} className="category-section">
      <Container>
        <h4 className="section-title">Search by Property Type</h4>
        <div className="category-grid">
          {categories.map((item, index) => (
            <div key={index} className="cat-card">
              <img src={item.img} alt={item.title} className="cat-img" />
              <p className="cat-title">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>

    </section>
  );
};

export default CategorySection;
