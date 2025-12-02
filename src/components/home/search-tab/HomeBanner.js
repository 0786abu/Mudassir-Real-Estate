"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";

const HomeBannerSection = () => {
  const dispatch = useDispatch();
  const { propertyStatus } = useSelector((state) => state.inputsReducer);

  const [filterValues, setFilterValues] = useState({
    propertyType: "",
    location: "",
    area: "",
    beds: "",
    price: "",
  });

  const handleSearch = () => {
    dispatch({ type: "UPDATE_FILTERS", payload: filterValues });
  };

  return (
    <section
    style={{
    backgroundImage: "url('/assets/images/8.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding:"150px 0"
  }}
    className="home-banner ">
      <Container>

        {/* ------- HERO TITLE (AUTO-STYLING KE LIYE AS-IT-IS) ------- */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            You are local Real estate
professionals
          </h2>
          <p className="text-muted">Residences can be classified by and connected to residences. Different types of housing can be use same physical type.</p>
        </div>

        {/* ---------------- FILTER BOX UI ---------------- */}
        <div
          className="custom-filter-box p-3 shadow-lg rounded"
          style={{ background: "#fff", marginTop: "25px" }}
        >

          {/* -------- BUY / RENT TOGGLE -------- */}
          <div className="d-flex justify-content-center mb-3">
            <div className="btn-group">
              <button
                className={`btn ${
                  propertyStatus === "Buy" ? "btn-primary" : "btn-light"
                }`}
                onClick={() =>
                  dispatch({ type: "propertyStatus", payload: "Buy" })
                }
              >
                Buy
              </button>

              <button
                className={`btn ${
                  propertyStatus === "Rent" ? "btn-primary" : "btn-light"
                }`}
                onClick={() =>
                  dispatch({ type: "propertyStatus", payload: "Rent" })
                }
              >
                Rent
              </button>
            </div>
          </div>

          {/* -------- MAIN FILTER BAR -------- */}
          <div className="row gx-2 gy-2 align-items-center">

            {/* Property Type */}
            <div className="col-md-3 col-6">
              <div className="border rounded p-2 d-flex align-items-center">
                <i className="fas fa-home me-2 text-primary"></i>
                <select
                  className="form-select border-0"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      propertyType: e.target.value,
                    })
                  }
                >
                  <option>Houses</option>
                  <option>Apartments</option>
                  <option>Plots</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="col-md-3 col-6">
              <div className="border rounded p-2 d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search Location"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      location: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Area */}
            <div className="col-md-2 col-6">
              <div className="border rounded p-2">
                <select
                  className="form-select border-0"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      area: e.target.value,
                    })
                  }
                >
                  <option>Select Area Size</option>
                  <option>5 Marla</option>
                  <option>10 Marla</option>
                  <option>1 Kanal</option>
                </select>
              </div>
            </div>

            {/* Beds */}
            <div className="col-md-2 col-6">
              <div className="border rounded p-2">
                <select
                  className="form-select border-0"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      beds: e.target.value,
                    })
                  }
                >
                  <option>No. of Beds</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="col-md-2 col-6">
              <div className="border rounded p-2">
                <select
                  className="form-select border-0"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      price: e.target.value,
                    })
                  }
                >
                  <option>Price</option>
                  <option>Below 50 Lac</option>
                  <option>50 Lac – 1 Crore</option>
                  <option>1 Crore – 2 Crore</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="col-md-2 col-12">
              <Link
                href="/listing/list-view/listing/left-sidebar"
                className="btn btn-dark w-100 py-2"
                onClick={handleSearch}
              >
                Search
              </Link>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeBannerSection;
