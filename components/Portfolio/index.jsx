import React from "react";
import Container from "../Container";
import Slider from "../EmblaCarouselAdvantage/EmblaCarousel";
import mockPortfolio from "../../data/mockPortfolio";
import Title from "../Title";
import SubTitle from "../SubTitle";
import ShowAllButton from "../ShowAllButton";
import { useRouter } from "next/router";

function Portfolio() {
    const router = useRouter();
  return (
    <div className="border-t border-t-borderColor">
      <Container>
        <div className="flex flex-row gap-9 items-center pt-60 pb-24 ">
          <Title>Portfolio</Title>
          <SubTitle>
            At our digital marketing agency, we offer a range of services to
            help businesses grow and succeed online. These services include:
          </SubTitle>
        </div>

        <Slider data={mockPortfolio} type="project" />
        <div className="flex justify-center items-center pb-60">
          <ShowAllButton onClick={() => router.push("/portfolio")}>Hamısına bax</ShowAllButton>
        </div>
      </Container>
    </div>
  );
}

export default Portfolio;
