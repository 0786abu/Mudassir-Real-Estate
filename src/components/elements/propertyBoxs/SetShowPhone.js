"use client"
import React, { useState } from 'react'

const SetShowPhone = ({phone}) => {
    const [show, setShow] = useState();
  return (
    <li>
                <i className="fas fa-phone-alt"></i>
                  <span className="character">+92 {phone == show ? phone : phone.slice(0, 5) + "*****"}</span>
                <span
                  className="label label-light label-flat"
                  onClick={() => {
                    setShow(phone);
                    phone == show && setShow();
                  }}>
                  {show === phone ? "Hide" : "Show"}
                </span>
              </li>
  )
}

export default SetShowPhone