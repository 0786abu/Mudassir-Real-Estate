import { Globe, Linkedin } from "lucide-react";
import React from "react";
import { Facebook, Instagram } from "react-feather";

const SocialAccounts = ({socialMedia}) => {
   return (
      <ul>
         {socialMedia?.website && (
            <li>
            <a href={socialMedia?.website}>
               <Globe/>
            </a>
         </li>
         )}
         {socialMedia?.linkedin && (
            <li>
            <a href={socialMedia?.linkedin}>
               <Linkedin/>
            </a>
         </li>
         )}
         {socialMedia?.facebook && (
            <li>
            <a href={socialMedia?.facebook}>
               <Facebook/>
            </a>
         </li>
         )}
         {socialMedia?.instagram && (
            <li>
            <a href={socialMedia?.instagram}>
               <Instagram/>
            </a>
         </li>
         )}
      </ul>
   );
};

export default SocialAccounts;