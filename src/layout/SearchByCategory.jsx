import { propertyTypesData } from "@/utils/FiltersCities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Container } from "reactstrap";

// css available on about.scss


const propertyTypes = propertyTypesData.flatMap(item => item.types);

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
          <button type="button" className="btn btn-dark">See all</button>
        </div>
        <div className="category-grid">
          {propertyTypes.slice(0,18).map((item, index) => (
            <div onClick={()=>handlePush(item)} key={index} className="cat-card">
              <Image src={"/assets/images/category-1.png"} width={80} height={80} alt={item} className="cat-img" />
              <p className="cat-title">{item}</p>
            </div>
          ))}
        </div>
      </Container>

    </section>
  );
};

export default CategorySection;
