import { GetAdminProperties } from '@/utils/HomePageValues';
import React from 'react'
import ChildSaleProeprty from './ChildSaleProeprty';

const AdminProperties = async() => {
    const adminProperties = await GetAdminProperties();
  return (
    <ChildSaleProeprty from={"adminProperties"} properties={adminProperties}/>
  )
}

export default AdminProperties