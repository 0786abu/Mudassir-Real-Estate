import { formatPK } from '@/utils/Formatter'
import React from 'react'
import { Badge, Card, CardBody, Media, Table } from 'reactstrap'
import { formatDatenew } from '../../Common/Propertybox/PropertyBox'

const RecentProperty = ({properties}) => {
    return (
        <div className="recent-properties">
            <Card>
                <CardBody>
                    <div className="title-about">
                        <h5>Recent properties</h5>
                    </div>
                    <div className="table-responsive">
                        <Table className="table-bordernone mb-0">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>CreatedAt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    properties?.length===0 ? (
                                        <tr>
                                            <td colSpan={4} align='center'>No Properties yet</td>
                                        </tr>
                                    ) :properties?.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <Media>
                                                        <img src={item.images[0]?.url} className="img-fluid img-80 object-fit-cover" alt='' />
                                                        <Media body>
                                                            <h6>{item.type}</h6>
                                                            <span className="light-font">{item.category}</span>
                                                        </Media>
                                                    </Media>
                                                </td>
                                                <td>
                                                    <span className="light-font">{formatPK(item.price)}</span>
                                                </td>
                                                <td>
                                                    <Badge color={item.isApproved==="Approved" ? "success" : item.isApproved==="Pending" ? "warning" : "danger"}>{item.isApproved}</Badge>
                                                </td>
                                                <td>
                                                    <span className="light-font">{formatDatenew(item.createdAt)}</span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default RecentProperty