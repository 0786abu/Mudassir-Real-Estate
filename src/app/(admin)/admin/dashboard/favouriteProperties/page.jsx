"use client";
import Breadcrumb from '@/adminComponents/components/Common/Breadcrumb'
import FavouriteProperties from '@/adminComponents/components/myproperties/favourites/FavouriteProperties'
import { GetFavouritesData } from '@/redux-toolkit/action/favouritesAction';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Input, Label, Row } from 'reactstrap'

const Favourites = () => {
    const {favProperties,favloading} = useSelector((state)=>state.Favourites)

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(GetFavouritesData())
  },[dispatch])
    return (
        <Fragment>
            {/* <Breadcrumb title='Favourites' titleText='Welcome To Admin Panel' parent='My Properties' /> */}
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <div className="property-admin mb-3">
                            <div className="property-section section-sm">
                                <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                    <Col className="col-12">
                                        <div className="filter-panel">
                                            <div className="listing-option">
                                                <h5 className="mb-0">Showing <span>{favloading ? "..." : favProperties?.length}</span> Listings</h5>
                                                {/* <div>
                                                    <div className="d-flex">
                                                        <span className="m-r-10">Map view</span>
                                                        <Label className="switch">
                                                            <Input type="checkbox" className="option-list" name="step_1" defaultValue="ani1" defaultChecked /><span className="switch-state" />
                                                        </Label>
                                                        <span className="m-l-10">List view</span>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <FavouriteProperties properties={favProperties} favloading={favloading} />
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </Fragment>
    )
}

export default Favourites