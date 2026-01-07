import { propertyTypesData } from "@/utils/FiltersCities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Container } from "reactstrap";

// css available on about.scss

const propertyTypes = [
  {
    id:1,
    type:"Agricultural Land",
    img:"/assets/images/filters/Agriculter-land.png"
  },
  {
    id:2,
    type:"Apartment & Flat",
    img:"/assets/images/filters/Apartments and Flats.png"
  },
  {
    id:3,
    type:"Building",
    img:"/assets/images/filters/Building.png"
  },
  {
    id:4,
    type:"Commercial Plot",
    img:"/assets/images/filters/Commercial Plots.png"
  },
  {
    id:5,
    type:"Corner Plot",
    img:"/assets/images/filters/Corner Plot.png"
  },
  {
    id:6,
    type:"Factory",
    img:"/assets/images/filters/Factories.png"
  },
  {
    id:7,
    type:"FarmHouse",
    img:"/assets/images/filters/FarmHouse.png"
  },
  {
    id:8,
    type:"plot file",
    img:"/assets/images/filters/Files plot.png"
  },
  {
    id:9,
    type:"House",
    img:"/assets/images/filters/House.png"
  },
  {
    id:10,
    type:"Industrial Plot",
    img:"/assets/images/filters/Industrial Plots.png"
  },
  {
    id:11,
    type:"Portion (Lower)",
    img:"/assets/images/filters/Lower Portion.png"
  },
  {
    id:12,
    type:"Portion (Upper)",
    img:"/assets/images/filters/Upper Portion.png"
  },
  {
    id:13,
    type:"Office",
    img:"/assets/images/filters/Office.png"
  },
  {
    id:14,
    type:"PentHouse",
    img:"/assets/images/filters/PentHouse.png"
  },
  {
    id:15,
    type:"Portions & Floors",
    img:"/assets/images/filters/Portions and Floors.png"
  },
  {
    id:16,
    type:"Residential Plot",
    img:"/assets/images/filters/Residential Plots.png"
  },
  {
    id:17,
    type:"Shop",
    img:"/assets/images/filters/Shops.png"
  },
  {
    id:18,
    type:"WareHouse",
    img:"/assets/images/filters/WareHouse.png"
  },
]

const CategorySection = () => {
  const router = useRouter();
  
  const handlePush = (type)=>{
    router.push(`/properties?type=${type}`)
  }
  return (
    <section style={{padding:"0px", marginTop:"80px", marginBottom:"0px"}} className="category-section">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="section-title">Search by Property Type</h4>
          {/* <button type="button" className="btn btn-dark">See all</button> */}
        </div>
        <div className="category-grid">
          {propertyTypes.map((item, index) => (
            <div onClick={()=>handlePush(item.type)} key={index} className="cat-card">
              <Image src={item.img} width={80} priority height={80} alt={item.type} className="cat-img" />
              <p className="cat-title">{item.type}</p>
            </div>
          ))}
        </div>
      </Container>

    </section>
  );
};

export default CategorySection;
