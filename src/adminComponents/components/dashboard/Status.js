import React from 'react'
import { TrendingUp } from 'react-feather'
import { Card, CardBody, Col, Media } from 'reactstrap'

const Status = ({data,totalProjects}) => {
    return (
        <>
            <Col xl='3 xl-6' md='6' className="project-widgets">
                <Card>
                    <CardBody>
                        <Media>
                            <div className="widget-icon bg-primary-light">
                                <i className="fab fa-foursquare" />
                            </div>
                            <Media body>
                                {/* <span>
                                    Completed
                                    <span className="font-success">
                                        + 20%
                                        <TrendingUp />
                                    </span>
                                </span> */}
                                <h4>Total Properties</h4>
                                <span className="status-history">{data[0]?.totalProperties || 0}</span>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl='3 xl-6' md='6' className="project-widgets">
                <Card>
                    <CardBody>
                        <Media>
                            
                            <div className="widget-icon bg-success-light">
                                <i className="fab fa-angellist" />
                            </div>
                            <Media body>
                                {/* <span>
                                    Completed
                                    <span className="font-success">
                                        + 15%
                                        <TrendingUp />
                                    </span>
                                </span> */}
                                <h4>Approved Proeprties</h4>
                                <h4 className="status-history">{data[0]?.approvedProperties || 0}</h4>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl='3 xl-6' md='6' className="project-widgets">
                <Card>
                    <CardBody>
                        <Media>
                            <div className="widget-icon bg-warning-light">
                                <i className="fab fa-behance" />
                            </div>
                            <Media body>
                                {/* <span>
                                    <span className="font-success">
                                        Coming soon
                                    </span>
                                </span> */}
                                <h4>Pending Properites</h4>
                                <h4>{data[0]?.pendingProperties || 0}</h4>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl='3 xl-6' md='6' className="project-widgets">
                <Card>
                    <CardBody>
                        <Media>
                            <i className="fab fa-cloudscale" />
                            <Media body>
                                {/* <span>
                                    Monthly
                                    <span className="font-success">
                                        + 10%
                                        <TrendingUp />
                                    </span>
                                </span> */}
                                <h4>Rejected Properties</h4>
                                <h4>{data[0]?.rejectedProperties || 0}</h4>
                                <span className="status-history"> New project</span>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="12" className="project-widgets">
                <Card>
                    <CardBody>
                        <Media>
                           <div className="widget-icon bg-success-light">
                                <i className="fab fa-angellist" />
                            </div>
                            <Media body>
                                {/* <span>
                                    Monthly
                                    <span className="font-success">
                                        + 10%
                                        <TrendingUp />
                                    </span>
                                </span> */}
                                <h4>Total Projects</h4>
                                <h4>{totalProjects || 0}</h4>
                                <span className="status-history"> New project</span>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default Status