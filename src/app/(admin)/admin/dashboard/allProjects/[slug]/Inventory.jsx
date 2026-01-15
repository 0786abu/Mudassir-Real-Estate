import { UpdateProjectItems } from '@/redux-toolkit/action/projectAction';
import { areaSizes, propertyTypesData } from '@/utils/FiltersCities';
import { formatPK } from '@/utils/Formatter';
import { Bath, Bed, Grid, Home } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';


const createSubItem = () => ({
  subItemTitle: "",
  minPrice: "",
  maxPrice: "",
  areaSize: "",
  beds: "",
  bathrooms: "",
});

const createItem = () => ({
  itemTitle: "",
  parentMinPrice: "",
  parentMaxPrice: "",
  subItems: [createSubItem()],
});

const Inventory = ({mainItems,slug,loader}) => {
     const [items, setItems] = useState([]);
     const [open2, setOpen2] = useState(() => {
  if (!mainItems || mainItems.length === 0) return [];
  return [mainItems[0]?._id || mainItems[0]?._id];
});
     const [open, setOpen] = useState(false);
     const toggle = ()=>setOpen(!open)

 const toggle2 = (id) => {
    setOpen2((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, createItem()]);
  };
  const dispatch = useDispatch();
  const handleSubmitData = ()=>{
    dispatch(UpdateProjectItems(items,slug,setOpen))
    console.log(items)
  }
  useEffect(() => {
  if (open) {
    if (mainItems?.length) {
      setItems(mainItems);
    } else {
      setItems([createItem()]);
    }
  }
}, [open, mainItems]);


  const removeItem = (itemIndex) => {
    setItems((prev) => prev.filter((_, i) => i !== itemIndex));
  };

  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  /* ================= SUB ITEMS ================= */

  const addSubItem = (itemIndex) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[itemIndex] = {
        ...updated[itemIndex],
        subItems: [...updated[itemIndex].subItems, createSubItem()],
      };
      return updated;
    });
  };

  const removeSubItem = (itemIndex, subIndex) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[itemIndex] = {
        ...updated[itemIndex],
        subItems: updated[itemIndex].subItems.filter(
          (_, i) => i !== subIndex
        ),
      };
      return updated;
    });
  };

  const updateSubItem = (itemIndex, subIndex, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      const subItems = [...updated[itemIndex].subItems];

      subItems[subIndex] = {
        ...subItems[subIndex],
        [field]: value,
      };

      updated[itemIndex] = {
        ...updated[itemIndex],
        subItems,
      };

      return updated;
    });
  };
  return (
    <div>
        <Modal toggle={toggle} isOpen={open} size='xl'>
            <ModalHeader toggle={toggle}>
                
            </ModalHeader>
            <ModalBody>
                {items?.map((item, i) => (
                              <Card key={i} className="mb-3 border">
                                <CardBody>
                                  <Row className="align-items-center">
                                    <Col md={4}>
                                      {/* <Input
                                        value={item.itemTitle}
                                        onChange={(e) =>
                                          updateItem(i, "itemTitle", e.target.value)
                                        }
                                      /> */}
                                      <Input
                                      name={item.type}
                                      value={item.itemTitle}
                                      onChange={(e) =>
                                          updateItem(i, "itemTitle", e.target.value)
                                        }
                                      type="select"
                                      className="form-control"
                                      
                                    >
                                      <option value={""}>Select Type</option>
                                      {propertyTypesData.map((item,index) => (
                    <optgroup key={index} label={item.mainType}>
                      {item.types.map((sub,index) => (
                        <option key={index} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                                    </Input>
                                    </Col>
                                    <Col md={3}>
                                      <Input
                                        type="number"
                                        placeholder="Min Price"
                                        value={item.parentMinPrice}
                                        onChange={(e) =>
                                          updateItem(i, "parentMinPrice", e.target.value)
                                        }
                                      />
                                    </Col>
                                    <Col md={3}>
                                      <Input
                                        type="number"
                                        placeholder="Max Price"
                                        value={item.parentMaxPrice}
                                        onChange={(e) =>
                                          updateItem(i, "parentMaxPrice", e.target.value)
                                        }
                                      />
                                    </Col>
                                    <Col md={2}>
                                      <Button
                                        color="danger"
                                        outline
                                        onClick={() => removeItem(i)}
                                      >
                                        Remove
                                      </Button>
                                    </Col>
                                  </Row>
                
                                  {/* SUB ITEMS */}
                                  <h6 className="mt-3">Sub Items</h6>
                
                                  {item.subItems.map((sub, s) => (
                                    <Row key={s} className="g-2 align-items-center mb-2">
                                      <Col md={2}>
                                        <Input
                                          placeholder="Title"
                                          value={sub.subItemTitle}
                                          onChange={(e) =>
                                            updateSubItem(
                                              i,
                                              s,
                                              "subItemTitle",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                      <Col md={2}>
                                        <Input
                                          type="number"
                                          placeholder="Min"
                                          value={sub.minPrice}
                                          onChange={(e) =>
                                            updateSubItem(i, s, "minPrice", e.target.value)
                                          }
                                        />
                                      </Col>
                                      <Col md={2}>
                                        <Input
                                          type="number"
                                          placeholder="Max"
                                          value={sub.maxPrice}
                                          onChange={(e) =>
                                            updateSubItem(i, s, "maxPrice", e.target.value)
                                          }
                                        />
                                      </Col>
                                      <Col md={2}>
                                        <Input
                                        type="select"
                                          placeholder="Area"
                                          value={sub.areaSize}
                                          className="form-control"
                                          onChange={(e) =>
                                            updateSubItem(i, s, "areaSize", e.target.value)
                                          }
                                        >
                                          <option value={""}>Selecte area size</option>
                                          {areaSizes.map((item,index)=>{
                                            return <option key={index} value={item}>{item}</option>
                                          })}
                                        </Input>
                                      </Col>
                                      <Col md={1}>
                                        <Input
                                          placeholder="Beds"
                                          value={sub.beds}
                                          onChange={(e) =>
                                            updateSubItem(i, s, "beds", e.target.value)
                                          }
                                        />
                                      </Col>
                                      <Col md={1}>
                                        <Input
                                          placeholder="Baths"
                                          value={sub.bathrooms}
                                          onChange={(e) =>
                                            updateSubItem(i, s, "bathrooms", e.target.value)
                                          }
                                        />
                                      </Col>
                                      <Col md={2}>
                                        <Button
                                          size="sm"
                                          color="danger"
                                          outline
                                          onClick={() => removeSubItem(i, s)}
                                        >
                                          Remove
                                        </Button>
                                      </Col>
                                    </Row>
                                  ))}
                
                                  <Button
                                    size="sm"
                                    color="secondary"
                                    onClick={() => addSubItem(i)}
                                  >
                                    + Add Sub Item
                                  </Button>
                                </CardBody>
                              </Card>
                            ))}
                
                            <Button color="success" className="mb-4" outline onClick={addItem}>
                              + Add Item
                            </Button>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSubmitData}>{loader ? <><span className=' spinner-border' role='status' style={{width:"16px",height:"16px"}}></span> Updating...</> : "Update"}</Button>
            </ModalFooter>
        </Modal>
        <Card className="mb-4 shadow-sm">
        <CardHeader className="fw-semibold d-flex justify-content-between align-items-center gap-2">
            <h2>Inventory</h2>
            <Button color='success' onClick={toggle}>Update inventory</Button>
        </CardHeader>
        <CardBody>
          <Accordion open={open2} toggle={toggle2} className="project-accordion" style={{marginTop:"-30px"}}>
      {mainItems?.map((item) => {
        const itemId = item._id || item._id; // ✅ FIXED

        return (
          <AccordionItem
            key={itemId} // ✅ UNIQUE STRING KEY
            className="project-accordion-item"
          >
            {/* HEADER */}
            <AccordionHeader
              targetId={itemId}
              className="project-accordion-header"
            >
              <div className="header-content">
                <div className="title">
                  <Home size={20} />
                  <span>{item.itemTitle}</span>
                </div>

                <strong className="price">
                  PKR {" "}
                  {formatPK(item.parentMinPrice)} to{" "}
                  {formatPK(item.parentMaxPrice)}
                </strong>
              </div>
            </AccordionHeader>

            {/* BODY */}
            <AccordionBody accordionId={itemId}>
              <div className="accordion-body-wrapper">
                {item.subItems?.map((sub) => {
                  const subId = sub._id || sub._id;

                  return (
                    <div key={subId} className="subitem-card">
                      <div className="subitem-top">
                        <h6>{sub.subItemTitle}</h6>
                        <Badge color="success">
                           PKR {" "}
                          {formatPK(sub.minPrice)} to{" "}
                          {formatPK(sub.maxPrice)}
                        </Badge>
                      </div>

                      <div className="subitem-features">
                        <div className="feature">
                          <Grid size={20} />
                            <span>areaSize: {sub.areaSize}</span>
                        </div>

                        <div className="feature">
                          <Bed size={20} />
                          <span>Beds: {sub.beds ?? "–"}</span>
                        </div>

                        <div className="feature">
                          <Bath size={20} />
                            <span>Baths: {sub.bathrooms ?? "–"}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </AccordionItem>
        );
      })}
    </Accordion>
        </CardBody>
      </Card>
    </div>
  )
}

export default Inventory