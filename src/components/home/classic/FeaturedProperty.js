/**
 * It takes an array of objects and returns a slider with each object as a slide
 * @returns An array of objects.
 */
"use client"
import React, { useState } from "react";
import Slider from "react-slick";
import { Button, Col, Container, Row } from "reactstrap";
import { Gallery, Item } from "react-photoswipe-gallery";
import Link from "next/link";
import { feature4 } from "@/data/slickSlider";
import Img from "@/utils/BackgroundImageRatio";
import { FeaturedProperty } from "@/constValues/constValues";
import NoSsr from "@/utils/NoSsr";
import { formatPK } from "@/utils/Formatter";
import { Bath, Bed } from "lucide-react";
import { useRouter } from "next/navigation";

const FeaturedPropertySection = ({ value,loading }) => {
  const [isHover, setIsHover] = useState("detail");
  const router = useRouter();
  const handleClick = ()=>{
    router.push("/properties?featured=yes")
  }
  return (
    <section className='feature-section ratio_landscape bg-half zoom-gallery'>
      {/* {loading ? (<ProfileLoader/>) : ( */}
        <Container>
        <Row>
          <Col>
          
            <NoSsr>
              <Slider className='feature-4 modern-feature arrow-gradient1' {...feature4}>
                {value &&
                  value?.map((data, i) => (
                    <div key={i}>
                      <div className='feature-wrap'>
                        <Row>
                          <Gallery>
                            <Col lg='6'>
                              <Item original={data.images[0].url} width='1000' height='600'>
                                {({ ref, open }) => (
                                  <div className='feature-image'>
                                    <Img src={data.images[0].url} className='bg-img' />
                                    <div className='feature-overlay' ref={ref} onClick={open}>
                                      <span style={{color:"#108a00"}}>+</span>
                                    </div>

                                    <span className='label label-gradient label-lg' style={{background:"#14a800"}}>{FeaturedProperty}</span>
                                  </div>
                                )}
                              </Item>
                            </Col>
                          </Gallery>

                          <Col lg='6'>
                            <div className='feature-content'>
                              <div className='details'>
                                <h3>
                                  <Link href={`/properties/${data.slug}`}>{data.title}</Link>
                                </h3>
                                <span>{data.city}, {data.location}</span>
                              </div>
                              <ul className='detail-list'>
                                <li>
                                  <div className='d-flex'>
                                    <span className='label label-light label-lg' style={{background:"#14a800"}}>
                                      {/* <img src='/assets/images/icon/bed.png' className='img-fluid img-icon' alt='' /> */}
                                      <Bed style={{color:"white"}}/>
                                    </span>
                                    <h6>Bedroom</h6>
                                  </div>
                                </li>
                                <li>
                                  <div className='d-flex'>
                                    <span className='label label-light label-lg' style={{background:"#14a800"}}>
                                      {/* <img src='/assets/images/icon/bathroom.png' className='img-fluid img-icon' alt='' /> */}
                                      <Bath style={{color:"white"}}/>
                                    </span>
                                    <h6>Bathroom</h6>
                                  </div>
                                </li>
                                <li>
                                  <span className='label label-light label-lg' style={{background:"#14a800",color:"white"}}>{data.squareFits} Sq Ft</span>
                                </li>
                              </ul>
                              <ul className='feature-price'>
                                <li>
                                  <h3>
                                    {formatPK(data.price)}*
                                  </h3>
                                  <h6>Home For {data.category}</h6>
                                </li>
                                <li>
                                  
                                  <Link href={`/properties/${data.slug}`}>
                                    <button style={{background:isHover==="detail" ? "#108a00" : "#14a800",color:"white"}} onMouseEnter={()=>setIsHover("detail")} onMouseLeave={()=>setIsHover("")} type='button' className='btn btn-lg'>
                                      View Detail
                                    </button>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}
              </Slider>
            </NoSsr>
          </Col>
          <div className="d-flex justify-content-center" style={{marginTop:"60px"}}>
            <Button size="sm" onMouseEnter={()=>setIsHover("all")} onMouseLeave={()=>setIsHover("")} onClick={handleClick} style={{background:isHover==="all" ? "#108a00" : "#14a800"}}>See all</Button>
          </div>
        </Row>
      </Container>
      {/* )} */}
    </section>
  );
};

export default FeaturedPropertySection;
