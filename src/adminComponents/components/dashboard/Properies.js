import { formatPK } from '@/utils/Formatter'
import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'react-feather'
import { Card, CardBody, CardHeader, Col, Media, Row } from 'reactstrap'

const Properies = ({data,paymentStats}) => {
    return (
        <Col xl='4 large-12'>
            <Row>
                <Col lg='12 large-6' md='6'>
                    <Card className="all-properties" style={{height:"250px"}}>
                        <CardBody>
                            <Media className="media">
                                <img src="/assets/images/svg/icon/1.svg" className="img-fluid" alt='' />
                                <Media body>
                                    <h4 className="mb-0">{data[0]?.totalProperties || 0}</h4>
                                    <h6 className="light-font">Properties</h6>
                                </Media>
                                <Link href='/admin/dashboard/allProperties' className="arrow-animated">
                                    See all properties
                                    <ChevronRight />
                                </Link>
                            </Media>
                            <ul className="light-box">
                                <li>
                                    <img src="/assets/images/svg/icon/sold.png" className="img-fluid" alt='' />
                                    <div>
                                        <h5>{data[0]?.saleProperties || 0}</h5>
                                        <span className="light-font">Sale</span>
                                    </div>
                                </li>
                                <li>
                                    <img src="/assets/images/svg/icon/rent.png" className="img-fluid" alt='' />
                                    <div>
                                        <h5>{data[0]?.rentProperties || 0}</h5>
                                        <span className="light-font">Rented</span>
                                    </div>
                                </li>
                                <li>
                                    <img src="/assets/images/svg/icon/unlisted.png" className="img-fluid" alt='' />
                                    <div>
                                        <h5>{data[0]?.unListedProperties || 0}</h5>
                                        <span className="light-font">Unlisted</span>
                                    </div>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg='12 large-6' md='6' style={{height:"100%"}}>
                    <Card className="invoice-card" style={{height:"250px"}}>
                        <CardHeader className="pb-0">
                            <div>
                                <h5>This Month</h5>
                            </div>
                        </CardHeader>
                        <CardBody className="calculations">
                            <ul>
                                <li>
                                    <h5 className="font-success">Rs. {formatPK(paymentStats[0]?.approvedAmount) || 0}</h5>
                                    <h6 className="light-font mb-0">Recieved AMount</h6>
                                </li>
                                <li>
                                    <h5 className="font-danger">Rs. {formatPK(paymentStats[0]?.pendingAmount) || 0}</h5>
                                    <h6 className="light-font mb-0">Pending Amount</h6>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <Link href='/agents/invoice' className="label label-light">
                                    <i className="fas fa-hand-holding-usd me-1" />
                                    Payments Receive
                                </Link>
                                <Link href='/admin/dashboard/payments' className="arrow-animated">
                                    View all
                                    <ChevronRight />
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>

    )
}

export default Properies