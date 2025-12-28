import Link from "next/link";
import React from "react";

const SocialAccounts = ({data}) => {
    return (
         <ul className="agent-social mt-2">
                                    {data?.facebook && (
                                        <li><Link target="_blank" href={data?.facebook} style={{background:"#0866FF"}}><i className="fab fa-facebook-f" /></Link></li>
                                    )}
                                    {data?.instagram && (
                                        <li><Link target="_blank" href={data?.instagram} className=" bg-danger"><i className="fab fa-instagram" /></Link></li>
                                    )}
                                    {data?.website && (
                                        <li><Link target="_blank" href={data?.website} className=" bg-light"><i className="fas fa-globe text-black" /></Link></li>
                                    )}
                                    {data?.linkedin && (
                                        <li><Link target="_blank" href={data?.linkedin} style={{background:"#0A66C2"}}><i className="fab fa-linkedin-in" /></Link></li>
                                    )}
                                    {data?.youtube && (
                                        <li><Link target="_blank" href={data?.youtube} className="bg-danger"><i className="fab fa-youtube" /></Link></li>
                                    )}
                                </ul>
    );
};

export default SocialAccounts;