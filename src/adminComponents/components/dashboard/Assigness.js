import Link from 'next/link'
import React from 'react'
import { Badge, Media, Table } from 'reactstrap'
import { formatPK } from '@/utils/Formatter'

const Assigness = ({data}) => {
    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h5>Recent Properties</h5>
                </div>
                <div className="card-body assign-table pt-0">
                    <div className="table-responsive">
                        <Table className="table-bordernone">
                            <tbody>
                                {
                                    data && data.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <Media>
                                                        <img src={item.images[0]?.url} className="" style={{width:"80px",heigth:"60px"}} alt='' />
                                                        <Media body>
                                                            <Link target='_blank' href={`/properties/${item.slug}`}>
                                                                <h6>{item.type}</h6>
                                                            </Link>
                                                            <span>{item.category}</span>
                                                        </Media>
                                                    </Media>
                                                </td>
                                                <td>
                                                    {/* <h6 className="font-danger">{item.open}</h6>
                                                    <span>Open</span> */}
                                                    <Badge color={item.isApproved==="Approved" ? "success" : item.isApproved==="Pending" ? "warning" : "danger"} className='text-white'>{item.isApproved}</Badge>
                                                </td>
                                                <td>
                                                    <span>City</span>
                                                    <h6 className="font-success">{item.city}</h6>
                                                </td>
                                                <td>
                                                    <span>Price</span>
                                                    <h6 className="font-success">{formatPK(item.price)}</h6>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assigness