"use client";

import { HomePageFilter1, HomePageFilter2, HomePageFilter3, HomePageFilter4, HomePageFilter5, HomePageFilter6, HomePageFilter7, HomePageFilter8 } from "@/utils/HomePageFilters";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HomePageFilter = () => {
  const [category, setCategory] = useState("sale");
  const [activeLink, setActiveLink] = useState(null)

  return (
    <div className="container my-5" style={{ maxWidth: "1280px" }}>
      <h2 className="fs-5 fw-semibold mb-2">Popular Locations</h2>

      <div className="d-flex gap-4 border-bottom">
        <span
          onClick={() => setCategory("sale")}
          className={`pb-2 cursor-pointer ${
            category === "sale"
              ? "text-success border-bottom border-2 border-success fw-medium"
              : "text-secondary"
          }`}
          style={{ cursor: "pointer" }}
        >
          For Sale
        </span>

        <span
          onClick={() => setCategory("rent")}
          className={`pb-2 cursor-pointer ${
            category === "rent"
              ? "text-success border-bottom border-2 border-success fw-medium"
              : "text-secondary"
          }`}
          style={{ cursor: "pointer" }}
        >
          To Rent
        </span>
      </div>

      {category==="sale" && (
      <div>
          <div className="mt-4">
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Cities to Buy Properties in Pakistan</span>
        <div>

          <div className="row mt-2">
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
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to Buy for Houses</span>
        <div>

          <div className="row mt-2">
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
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to Buy for Plots</span>
        <div>

          <div className="row mt-2">
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
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famouse Locations to Sale for Apartments</span>
        <div>

          <div className="row mt-2">
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
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Cities to Rent Properties in Pakistan</span>
        <div>

          <div className="row mt-2">
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
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to Rent for Houses</span>
        <div>

          <div className="row mt-2">
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
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famous Locations to Rent for Plots</span>
        <div>

          <div className="row mt-2">
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
        <span style={{fontSize:"15px", fontWeight:"bold"}}>Most Famouse Locations to Rent for Apartments</span>
        <div>

          <div className="row mt-2">
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
