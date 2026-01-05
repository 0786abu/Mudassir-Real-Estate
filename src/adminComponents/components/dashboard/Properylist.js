import Link from 'next/link'
import React from 'react'
import { Media } from 'reactstrap'

const Properylist = ({data}) => {
    return (
        <div className="col-xl-3 xl-6 col-lg-12 col-md-6">
            <div className="card">
                <div className="card-header pb-0">
                    <div className="d-flex">
                        <h5>My properties</h5>
                        <Link href="/admin/dashboard/create-property">+ New</Link>
                    </div>
                </div>
                <div className="card-body properties-list">
                    {
                        data && data.map((item, i) => {
                            return (
                                <Media key={i}>
                                    <img src={item.images[0]?.url} className="img-fluid" alt='' />
                                    <Media body>
                                        <Link target='_blank' href={`/admin/dashboard/myProperties/${item.slug}`}>
                                            <h6>{item.type}</h6>
                                        </Link>
                                        <ul>
                                            <li>
                                                <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt='' />
                                                <span>{item.beds}</span>
                                            </li>
                                            <li>
                                                <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt='' />
                                                <span>{item.baths}</span>
                                            </li>
                                            {/* <li>
                                                <img src="/assets/images/svg/icon/sofa.svg" className="img-fluid" alt='' />
                                                <span>{item.sofa}</span>
                                            </li> */}
                                        </ul>
                                        <div>
                                            <span className="light-font">Status: </span>
                                            <span className={`label label-light-success`}>{item.category}</span>
                                        </div>
                                    </Media>
                                </Media>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Properylist