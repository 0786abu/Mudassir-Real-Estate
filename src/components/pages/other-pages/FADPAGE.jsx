"use client";
import React, { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { Button, Container, Row } from "reactstrap";
import Breadcrumb from "@/layout/Breadcrumb/Breadcrumb";
import { useRouter } from "next/navigation";



const Faq = () => {
  const [active, setActive] = useState(0);
  const handleClick = (value) => {
    setActive(value);
    active === value && setActive();
  };

  const data = [
    {
      title: "What is Pakearth?",
      details: "Pakearth is an online platform that allows users to post and browse real estate ads, helping buyers, sellers, and renters connect efficiently.",
    },
    {
      title: "How do I post an ad on Pakearth?",
      details: "To post an ad, register on our website, navigate to the (Post Ad) section, fill in the property details, upload images, and submit your listing for approval.",
    },
    {
      title: "Is posting an ad free?",
      details:
        "We offer both free and premium ad posting options. Premium listings get more visibility and additional features.",
    },
    {
      title: "How can I contact a property owner?",
      details:
        "Each listing has a contact section where you can find the owner’s details or send an inquiry directly through the website.",
    },
    {
      title: "How do I edit or delete my ad?",
      details:
        "Log in to your account, go to (My Listings), select the ad you want to edit or delete, and follow the on-screen instructions.",
    },
    {
      title: "How long will my ad be live?",
      details:
        "Ads typically remain live for a set duration, which depends on the package you choose. You can renew or upgrade your listing if needed.",
    },
    {
      title: "How can I improve my ad’s visibility?",
      details:
        "For better visibility, use high-quality images, detailed descriptions, and consider upgrading to a premium listing.",
    },
    {
      title: "What should I do if I encounter fraudulent listings?",
      details:
        "If you come across a suspicious or fraudulent listing, report it using the (Report Ad) feature or contact our support team.",
    },
    {
      title: "Does Pakearth verify property listings?",
      details:
        "While we strive to maintain quality, we encourage users to independently verify property details before making any transactions.",
    },
    {
      title: "How do I contact Pakearth support?",
      details:
        "You can reach our support team via the (Contact Us) page, email, or phone for any queries or assistance.",
    },
    {
      title: "How can I reset my password?",
      details:
        "Click on (Forgot Password) on the login page and follow the instructions to reset your password.",
    },
    {
      title: "Can I feature my ad at the top of search results?",
      details:
        "Yes, we offer premium listing options to boost your ad’s visibility",
    },
    {
      title: "Are there any restrictions on the type of ads I can post?",
      details:
        "Yes, ads must comply with our terms of service and local property laws.",
    },
    {
      title: "How do I report a problem with my listing?",
      details:
        "Go to (My Listings), find the ad, and select (Report a Problem) or contact our support team.",
    },
    {
      title: "Can I post ads for commercial properties?",
      details:
        "Yes, we allow ads for residential, commercial, and rental properties.",
    },
    {
      title: "How do I update my contact information?",
      details:
        "Log in to your account and navigate to (Profile Settings) to update your details.",
    },
    {
      title: "Do you offer any promotional deals for frequent advertisers?",
      details:
        "Yes, we have special packages for bulk advertisers and real estate agencies.",
    },
    {
      title: "Can I post an ad on behalf of someone else?",
      details:
        "Yes, but ensure you have their consent and provide accurate details.",
    },
    {
      title: "How do I know if my ad has been approved?",
      details:
        "You will receive a confirmation email once your ad is approved and live.",
    },
    {
      title: "What payment methods do you accept for premium listings?",
      details:
        "We accept various payment methods, including credit/debit cards, bank transfers, and online payment gateways.",
    },
  ];
  const router = useRouter();
  return (
    <Fragment>
      <Breadcrumb />
      <section className='faq-section log-in'>
        <Container>
          <Row>
            <div className='col-lg-6 order-lg-1'>
              <div className='faq-image text-center'>
                <img src='/assets/images/inner-pages/3.svg' className='img-fluid' alt='' />
                <h3>Have Any Questions ?</h3>
                <p className='font-roboto'>You can ask anything you want to know</p>
              </div>
              <div className=" text-center mt-4">
                <Button onClick={()=>router.push("/contact")}>Contact us</Button>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='faq-questions'>
                <div className='mb-2 text-start'>
                  <h2>Frequently ask question</h2>
                </div>

                <div id='accordion' className='accordion'>
                  {data.map((data, i) => (
                    <div className='card' key={i}>
                      <div className='card-header'>
                        <a className='card-link ' onClick={() => handleClick(i)}>
                          {data.title}
                          {active === i ? <ChevronDown className='float-end' /> : <ChevronRight className='float-end' />}
                        </a>
                      </div>
                      <div className={`collapse ${active === i ? "show" : ""}`}>
                        <div className='card-body'>{data.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Faq;
