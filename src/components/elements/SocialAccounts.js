import { Globe, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Facebook, Instagram } from "react-feather";

const SocialAccounts = ({socialMedia}) => {
   return (
      <ul>
         {socialMedia?.website && (
            <li>
            <Link style={{color:"#108A00"}} href={socialMedia?.website}>
               <Globe/>
            </Link>
         </li>
         )}
         {socialMedia?.linkedin && (
            <li>
            <Link style={{color:"#108A00"}} href={socialMedia?.linkedin}>
               <Linkedin/>
            </Link>
         </li>
         )}
         {socialMedia?.facebook && (
            <li>
            <Link style={{color:"#108A00"}} href={socialMedia?.facebook}>
               <Facebook/>
            </Link>
         </li>
         )}
         {socialMedia?.instagram && (
            <li>
            <Link style={{color:"#108A00"}} href={socialMedia?.instagram}>
               <Instagram/>
            </Link>
         </li>
         )}
      </ul>
   );
};

export default SocialAccounts;