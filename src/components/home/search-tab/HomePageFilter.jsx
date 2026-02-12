"use client";

import { HomePageFilter1, HomePageFilter2, HomePageFilter3, HomePageFilter4, HomePageFilter5, HomePageFilter6, HomePageFilter7, HomePageFilter8 } from "@/utils/HomePageFilters";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HomePageFilter = () => {
  const [category, setCategory] = useState("sale");
  const [activeLink, setActiveLink] = useState(null);
  const {selectedFilterCategory} = useSelector((state)=>state.Property);

  useEffect(()=>{
    setCategory(selectedFilterCategory.toLowerCase())
  }, [selectedFilterCategory])

  return (
    <div className="container my-5" style={{ maxWidth: "1400px" }}>
      <h2 className="fs-5 fw-semibold mb-2">Popular Locations</h2>

       <div className=" border-bottom pb-1">
        <div className="button-group1 shadow-sm">
      <button
        className={`btnhome me-1 ${category === "sale" ? "active" : ""}`}
        onClick={() => setCategory("sale")}
      >
        For Sale
      </button>

      <button
        className={`btnhome ${category === "rent" ? "active" : ""}`}
        onClick={() => setCategory("rent")}
      >
        To Rent
      </button>
    </div>
       </div>

      {category==="sale" && (
      <div>
          <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Cities to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Buy</span> Properties in Pakistan</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter1.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.type}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
        <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Buy</span> for Houses</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter2.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.city}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
        <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Buy</span> for Plots</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter3.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.city}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
        <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famouse Locations to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Buy</span> for Apartments</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter4.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.city}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
      </div>
      )}
      {category==="rent" && (
        <div>
          <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Cities to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Rent</span> Properties in Pakistan</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter5.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.type}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
        <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Rent</span> for Houses</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter6.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.city}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
        <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Rent</span> for Plots</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter7.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.city}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
        <div className="mt-4">
        <p className=" text-center" style={{fontSize:"15px", fontWeight:"bold"}}>Most Famouse Locations to <span style={{color:"#14a800",fontSize:"15px",fontWeight:"bold"}}>Rent</span> for Apartments</p>
        <div>

          <div className="row mt-2 homepagefiltercard p-4 rounded-4 shadow-sm">
            {HomePageFilter8.map((section, sectionIndex) => (
                <div key={sectionIndex} className="col-lg-3 col-md-4">
                    <h6 className=" fw-bold">{section.city}</h6>
                    <ul className="row gap-2">
                        {section.data.map((item,index)=>{
                        return <Link href={{
                            pathname:"/properties",
                            query: item.query
                        }} key={index} style={{fontSize:"14px"}} className={`homefilterli ${
    activeLink === `${sectionIndex}-${index}` ? "active" : ""
  }`}
  onClick={() =>
    setActiveLink(`${sectionIndex}-${index}`)
  }><span><ExternalLink size={18} style={{color:"#14a800"}}/></span> <span>{item.title}</span></Link>
                    })}
                    </ul>
                </div>

      ))}
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default HomePageFilter;
