import Listview from '@/adminComponents/components/myproperties/PropertyList/Listview';
import Pagination from '@/layout/Pagination';
import React, { Fragment } from 'react'
import { Col, Container, Row } from 'reactstrap';

const HotProperties = async({searchParams}) => {
  const safeParams = Object.fromEntries(
    Object.entries(searchParams || {}).filter(
      ([, value]) => typeof value === "string" || typeof value === "number"
    )
  );

  const query = new URLSearchParams(safeParams).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/property/adminProperties?${query}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const { properties, totalPages, page, totalProperties } = data;
  return (
    <Fragment>
        <Container fluid={true}>
                <Row style={{marginTop:"-20px",marginBottom:"20px",maxWidth:"1280px",padding:"0px 20px"}} className='mx-auto'>
                  <Col lg='12'>
                    <div className='property-admin'>
                      <div className='property-section section-sm'>
                        <Row className='ratio_55 property-grid-2 property-map map-with-back'>
                            <Listview data={properties}/>
                  {totalProperties > 12 && (
                          <Pagination
                            totalPages={totalPages}
                            currentPage={page}
                            searchParams={safeParams}
                            from={"hotProperties"}
                          />
                        )}
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
    </Fragment>
  )
}

export default HotProperties