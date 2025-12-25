import Link from 'next/link'
import React from 'react'
import { Badge, Card, CardBody, Col, Media, Table } from 'reactstrap'
import { formatDatenew } from '../../Common/Propertybox/PropertyBox'

const ProfileDetail = ({aboutUser}) => {
    return (
        <>
            <Col sm="12">
                <Card>
                    <CardBody >
                        <Media className="contact-media">
                            <img src={aboutUser?.agencyProfile?.url || aboutUser?.profile?.url || "/assets/images/profile.png"} className="img-fluid img-80" alt='' />
                            <Media body>
                                <h4>{aboutUser?.name}</h4>
                                <span className="light-font">{aboutUser?.email}</span>
                                <div>
                                    <Badge color={aboutUser?.role==="agent" ? "info" : "success"}>{aboutUser?.role}</Badge>
                                </div>
                               {aboutUser?.role==="agent" && (
                                 <ul className="agent-social mt-2">
                                    {aboutUser?.socialMedia?.facebook && (
                                        <li><Link href={aboutUser?.socialMedia?.facebook} className="facebook"><i className="fab fa-facebook-f" /></Link></li>
                                    )}
                                    {aboutUser?.socialMedia?.instagram && (
                                        <li><Link href={aboutUser?.socialMedia?.instagram} className=" bg-danger"><i className="fab fa-instagram" /></Link></li>
                                    )}
                                    {aboutUser?.socialMedia?.website && (
                                        <li><Link href={aboutUser?.socialMedia?.website} className=" bg-light"><i className="fas fa-globe text-black" /></Link></li>
                                    )}
                                    {aboutUser?.socialMedia?.linkedin && (
                                        <li><Link href={aboutUser?.socialMedia?.linkedin} className="linkedin"><i className="fab fa-linkedin-in" /></Link></li>
                                    )}
                                    {aboutUser?.socialMedia?.youtube && (
                                        <li><Link href={aboutUser?.socialMedia?.youtube} className="bg-danger"><i className="fab fa-youtube" /></Link></li>
                                    )}
                                </ul>
                               )}
                            </Media>
                        </Media>
                        {/* <div className="contact-btn">
                            <Link href='/manage-users/allusers' className="btn btn-gradient btn-pill">Email</Link>
                            <Link href='/manage-users/add-user' className="btn btn-dashed ms-2 btn-pill">Message</Link>
                        </div> */}
                    </CardBody>
                </Card>
                 <Card>
                            <CardBody>
                                <div className="title-about">
                                    <h5>About</h5>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-bordernone mb-0">
                                        <tbody>
                                           
                                           {aboutUser?.agencyName && (
                                             <tr className='d-flex justify-content-start align-items-center'>
                                                <td className="pt-0">Agency Name:</td>
                                                <td className="light-font pt-0">{aboutUser?.agencyName}</td>
                                            </tr>
                                           )}
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td className="pt-0">Email:</td>
                                                <td className="light-font pt-0">{aboutUser?.email} <Badge color='success'>{aboutUser?.isEmailVerified ? "Verified" : "unVerified"}</Badge></td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td>Mobile Number:</td>
                                                <td className="light-font">{aboutUser?.phone ? aboutUser?.phone : "no phone number yet"} {aboutUser?.phone && (<Badge color={aboutUser?.isPhoneVerified ? "success" : "danger"}>{aboutUser?.isPhoneVerified ? "Verified" : "unVerified"}</Badge>)}</td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td>Gender:</td>
                                                <td className="light-font">{aboutUser?.gender ? aboutUser?.gender : "No gender selected yet"}</td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td className="pb-0">DOB:</td>
                                                <td className="light-font pb-0">{aboutUser?.DOB ? formatDatenew(aboutUser?.DOB) : "No DOB added yet"}</td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td className="pb-0">JoinedAt:</td>
                                                <td className="light-font pb-0">{formatDatenew(aboutUser?.createdAt)}</td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td className="pb-0">State:</td>
                                                <td className="light-font pb-0">{aboutUser?.state ? aboutUser?.state : "No added yet"}</td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td className="pb-0">City:</td>
                                                <td className="light-font pb-0">{aboutUser?.city ? aboutUser?.city : "No added yet"}</td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-center'>
                                                <td className="pb-0">Address:</td>
                                                <td className="light-font pb-0">{aboutUser?.address ? aboutUser?.address : "No added yet"}</td>
                                            </tr>
                                            <tr className='d-flex justify-content-start align-items-start'>
                                                <td className="pb-0">Bio:</td>
                                                <td className="light-font pb-0">{aboutUser?.bio ? aboutUser?.bio : "No bio yet"}</td>
                                            </tr>
                                            
                
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
            </Col>
        </>
    )
}
export default ProfileDetail
