import { BUDGET_FILTERS } from '@/utils/FiltersCities'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Badge } from 'reactstrap'

const BudgetSection = () => {
    const router = useRouter();
const applyBudgetFilter = ({ property, range }) => {
  const filter = BUDGET_FILTERS[property][range];

  const params = new URLSearchParams();
  params.set("type", filter.type);

  if (filter.minPrice !== 0) {
    params.set("minPrice", filter.minPrice);
  }

  if (filter.maxPrice !== null) {
    params.set("maxPrice", filter.maxPrice);
  }

  router.push(`/projects?${params.toString()}`);
};

  return (
    <div style={{maxWidth:"1280px",margin:"40px auto"}}>
        <h3 className=' text-decoration-underline'>Search project by budget</h3>
        <div className='mt-4'>
            <div className='d-flex align-items-center gap-4 flex-wrap'>
                <Badge onClick={()=>applyBudgetFilter({property:"apartment",range:BUDGET_FILTERS.apartment.below_30.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.apartment.below_30.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"apartment",range:BUDGET_FILTERS.apartment.between_30_80.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.apartment.between_30_80.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"apartment",range:BUDGET_FILTERS.apartment.above_80.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.apartment.above_80.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"commercial_plot",range:BUDGET_FILTERS.commercial_plot.below_20.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.commercial_plot.below_20.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"commercial_plot",range:BUDGET_FILTERS.commercial_plot.between_20_60.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.commercial_plot.between_20_60.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"commercial_plot",range:BUDGET_FILTERS.commercial_plot.above_60.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.commercial_plot.above_60.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"house",range:BUDGET_FILTERS.house.below_30.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.house.below_30.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"house",range:BUDGET_FILTERS.house.between_30_80.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.house.between_30_80.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"house",range:BUDGET_FILTERS.house.above_80.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.house.above_80.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"office",range:BUDGET_FILTERS.office.below_20.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.office.below_20.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"office",range:BUDGET_FILTERS.office.between_20_60.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.office.between_20_60.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"office",range:BUDGET_FILTERS.office.above_60.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.office.above_60.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"residential_plot",range:BUDGET_FILTERS.residential_plot.below_15.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.residential_plot.below_15.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"residential_plot",range:BUDGET_FILTERS.residential_plot.between_15_70.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.residential_plot.between_15_70.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"residential_plot",range:BUDGET_FILTERS.residential_plot.above_70.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.residential_plot.above_70.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"shop",range:BUDGET_FILTERS.shop.below_20.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.shop.below_20.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"shop",range:BUDGET_FILTERS.shop.between_20_60.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.shop.between_20_60.label}</Badge>
                <Badge onClick={()=>applyBudgetFilter({property:"shop",range:BUDGET_FILTERS.shop.above_60.value})} color='light' className=' fw-semibold text-black fs-6' style={{cursor:"pointer"}}>{BUDGET_FILTERS.shop.above_60.label}</Badge>
            </div>
        </div>
    </div>
  )
}

export default BudgetSection