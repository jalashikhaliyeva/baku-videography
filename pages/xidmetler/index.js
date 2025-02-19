import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SingleTitle from "@/components/SingleTitle";
import CerviceCardSingle from "@/components/CerviceCardSingle";
import mockServices from "@/data/mockServicesSingle";
import Container from "@/components/Container";
export default function Xidmetler() {
  return (
    <>
      <Head />
      <Header />
      <SingleTitle>Xidmetler</SingleTitle>
      <Container>
        <CerviceCardSingle item={mockServices} />
      </Container>
      <Footer />
    </>
  );
}
