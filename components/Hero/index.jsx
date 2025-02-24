import React from "react";
import PrimaryButton from "../PrimaryButton";
import Container from "../Container";
import { spaceGrotesk } from "../../lib/fonts";
import Image from "next/image";
import styles from "./style.module.css";

function Hero({ data }) {


  return (
    <div className="pt-120">
      <Container>
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="flex flex-col justify-center gap-8 w-full md:w-[45%]">
            <h1
              className={`${spaceGrotesk.className} text-title text-6xl leading-64 font-bold`}
            >
              {data.name}
            </h1>
            <p
              className={`${spaceGrotesk.className} text-subTitle text-xl font-normal`}
            >
              {data.description}
            </p>
            <PrimaryButton
              onClick={() => {
                const url = data.button_link.startsWith("http")
                  ? data.button_link
                  : `https://${data.button_link}`;
                window.open(url, "_blank");
              }}
              bgColor="bg-primaryBtn"
              textColor="text-white"
              hoverBgColor="hover:bg-white"
              hoverTextColor="hover:text-title"
              borderColor="border-title"
              hoveredBorderColor="hover:border-title"
            >
              {data.button_text}
            </PrimaryButton>
          </div>

          <div className="block md:hidden w-full">
            <Image
              src={data.image}
              // src="/images/hero/photograph.jpg"
              alt="Photography"
              width={200}
              height={600}
              className="max-w-full w-full  mx-auto rounded-3xl mt-8 h-[400px] object-cover"
            />
          </div>

          <div className="hidden md:block relative w-full md:w-[45%] aspect-[5/6]">
            <Image
              // src={data.image}
              src="/images/hero/hero-bg.png"
              alt="hero background image"
              fill
              objectFit="contain"
              className={`${styles.bgHeroImagee} hidden rounded-lg none md:block`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={styles.responsivePhoto}>
                <Image
                  src={data.image}
                  alt="Photography"
                  width={400}
                  height={600}
                  className="max-w-full h-auto rounded-3xl translate-x-4"
                />
              </div>
            </div>

            <div
              className={`absolute left-4 top-[500px] py-3 px-6 bg-lightGreen rounded-2xl ${styles.animateupdown}`}
            >
              {data.title_1}
            </div>
            <div
              className={`absolute right-4 top-[100px] py-3 px-6 bg-lightGreen rounded-2xl ${styles.animatedownup}`}
            >
              {data.title_2}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
