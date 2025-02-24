import { instanceAxios } from "@/shared/instanceAxios";

export const getSinglePortfolio = async (lang, slug) => {
  try {
 
    const response = await instanceAxios.get(`portfolio/${slug}`, {
      headers: {
        "Accept-Language": lang,
      },
    });
    return response.data; // e.g. { item: { ... } }
  } catch (error) {
    console.error(`Error fetching single service [${slug}]:`, error);
    throw error;
  }
};
