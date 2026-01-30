"use client"
import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Badge, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PRIMARY = "#14a800";

const plans = [
  {
    name: "Silver Plan",
    price: "Free",
    validity: "30 Days",
    ideal: "Individuals & Beginners",
    features: [
      "Up to 1 Property Listing",
      "Standard Customer Support",
      "No Featured Listings",
      "Basic Visibility",
    ],
  },
  {
    name: "Gold Plan",
    price: "PKR 5,000 / Year",
    ideal: "Independent Agents & Small Agencies",
    popular: true,
    features: [
      "Up to 100 Property Listings",
      "1 Premium Listing",
      "Verified Agent Profile",
      "SMS & Email Promotions",
      "Optimized Descriptions",
    ],
  },
  {
    name: "Premium Plan",
    price: "PKR 20,000 / Year",
    ideal: "Growing Agencies & Developers",
    features: [
      "Up to 300 Property Listings",
      "2 Top Premium Listings",
      "Agency Branding Ads",
      "Social Media Promotion",
      "Analytics & Reports",
    ],
  },
  {
    name: "Premium Plus",
    price: "PKR 50,000 / Year",
    ideal: "Established Agencies & Developers",
    features: [
      "Up to 600 Property Listings",
      "10 Top Premium Listings",
      "Best Agencies Feature",
      "Advanced Marketing Campaigns",
      "Detailed Insights & Reports",
    ],
  },
];

export default function PricingPage() {
    const router = useRouter();
    const handlePush = ()=>{
        router.push("/contact")
    }
  return (
    <div className="pricing-page">
      <section className="hero text-center text-white py-5">
        <Container>
          <h1 className="fw-bold">Advertise With PakEarth</h1>
          <p className="mt-3 text-white-50">
            Reach 100,000+ monthly real estate buyers, sellers & investors across Pakistan
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Row>
          {plans.map((plan, i) => (
            <Col md="6" lg="3" key={i} className="mb-4">
              <Card className={`h-100 pricing-card ${plan.popular ? "popular" : ""}`}>
                {plan.popular && (
                  <Badge color="success" className="popular-badge">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center bg-transparent border-0">
                  <h4 className="fw-bold">{plan.name}</h4>
                  <h3 className="price mt-2">{plan.price}</h3>
                  {plan.validity && <p className="text-muted">Validity: {plan.validity}</p>}
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="mb-2">✔ {f}</li>
                    ))}
                  </ul>
                  <p className="text-muted small">Ideal for: {plan.ideal}</p>
                  <Button onClick={handlePush} block className="btn-primary-custom mt-3">
                    Choose Plan
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="pb-5">
        <h2 className="text-center fw-bold mb-4">Banner Advertising</h2>
        <Table responsive bordered className="text-center">
          <thead className="table-head">
            <tr>
              <th>Placement</th>
              <th>Size</th>
              <th>Price (Monthly)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Top Home Header</td><td>728 x 90</td><td>PKR 30,000</td></tr>
            <tr><td>Sticky Header</td><td>728 x 90</td><td>PKR 30,000</td></tr>
            <tr><td>Popup Header</td><td>728 x 90</td><td>PKR 50,000</td></tr>
            <tr><td>Sidebar (GIF)</td><td>300 x 250</td><td>PKR 5,000</td></tr>
            <tr><td>Footer Banner</td><td>2048 x 350</td><td>PKR 10,000</td></tr>
            <tr><td>Sponsored Agents</td><td>-</td><td>PKR 10,000</td></tr>
            <tr><td>Sponsored Projects</td><td>720 x 90</td><td>PKR 50,000</td></tr>
          </tbody>
        </Table>
      </Container>
{/* Who Can Advertise */}
<section className="who-section py-5">
<Container>
<h2 className="text-center fw-bold mb-4">Who Can Advertise on PakEarth?</h2>
<Row className="text-center">
{[
"Property Owners & Sellers",
"Real Estate Agents & Agencies",
"Property Developers & Builders",
"Housing Projects & Societies",
"Real Estate Service Providers",
].map((item, idx) => (
<Col md="4" key={idx} className="mb-2">✔ {item}</Col>
))}
</Row>
</Container>
</section>


{/* Benefits */}
<section className="benefits-section py-5 bg-light">
<Container>
<h2 className="text-center fw-bold mb-4">Benefits of Advertising with PakEarth</h2>
<Row className="text-center">
<Col md="3">✅ Reach serious buyers</Col>
<Col md="3">✅ Affordable packages</Col>
<Col md="3">✅ Higher credibility</Col>
<Col md="3">✅ Strong ROI</Col>
</Row>
</Container>
</section>


{/* Contact CTA */}
<section className="contact-section text-white py-5 text-center">
<Container>
<h2 className="fw-bold">Let PakEarth Help You Grow</h2>
<p className="mt-2">Contact our advertising team today</p>
<p className="mt-3">
📞 0316-424126 | ✉ Mudy@pakearth.com | 💬 WhatsApp: 92316424126
</p>
<Button onClick={handlePush} className="btn-primary-custom mt-3">Contact Now</Button>
</Container>
</section>
      

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, ${PRIMARY}, #0e7c00);
        }
        .pricing-card {
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          position: relative;
          transition: all 0.3s ease;
        }
        .pricing-card:hover {
          transform: translateY(-8px);
        }
        .popular {
          border: 2px solid ${PRIMARY};
        }
        .popular-badge {
          position: absolute;
          top: -10px;
          right: 20px;
          background: ${PRIMARY} !important;
        }
        .price {
          color: ${PRIMARY};
        }
        .btn-primary-custom {
          background: ${PRIMARY};
          border: none;
          border-radius: 30px;
        }
        .btn-primary-custom:hover {
          background: #0e7c00;
        }
        .table-head {
          background: ${PRIMARY};
          color: #fff;
        }
      `}</style>
    </div>
  );
}
