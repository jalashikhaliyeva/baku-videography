// data/mockServices.js

const totalServices = 24;

const mockServices = Array.from({ length: totalServices }, (_, index) => {
  const serviceNumber = index + 1;
  return {
    slug: `service-${serviceNumber}`,
    title: `Service ${serviceNumber}`,
    short_desc: `This is a short description for Service ${serviceNumber}.`,
    image: "/images/hero/photography.jpg",
    image_2: "/images/hero/photograph.jpg",
  };
});

export default mockServices;
