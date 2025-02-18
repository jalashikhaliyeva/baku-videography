import React from "react";
import Container from "../Container";
import Title from "../Title";
import SubTitle from "../SubTitle";
import ContactSection from "../ContactSection";

function Contact() {
  return (
    <div className="border-t border-t-borderColor">
      <Container>
        <div className="flex flex-row gap-9 items-center pt-60 pb-9 ">
          <Title>Bizimlə əlaqə</Title>
          <SubTitle>
            At our digital marketing agency, we offer a range of services to
            help businesses grow and succeed online. These services include:
          </SubTitle>
        </div>


        <ContactSection />
      </Container>
    </div>
  );
}

export default Contact;
