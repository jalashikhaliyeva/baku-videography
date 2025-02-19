import React from "react";
import Title from "../Title";
import Container from "../Container";
import SubTitle from "../SubTitle";
import mockServices from "../../data/mockServices";
import CerviceCard from "../CerviceCard";
import ShowAllButton from "../ShowAllButton";
import { useRouter } from "next/router";

function Services() {
  const router = useRouter();
  return (
    <>
      <Container>
        <div className="flex flex-row gap-9 items-center pt-60 pb-24">
          <Title>Xidmətlər</Title>
          <SubTitle>
            At our digital marketing agency, we offer a range of services to
            help businesses grow and succeed online. These services include:
          </SubTitle>
        </div>

        <CerviceCard item={mockServices} />
        <div className="flex justify-center items-center pb-60">
          <ShowAllButton onClick={() => router.push("/xidmetler")}>
            Hamısına bax
          </ShowAllButton>
        </div>
      </Container>
    </>
  );
}

export default Services;
