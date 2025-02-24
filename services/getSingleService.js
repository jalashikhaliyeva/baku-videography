import { instanceAxios } from "@/shared/instanceAxios";

export const getSingleService = async (lang, slug) => {
  try {
 
    const response = await instanceAxios.get(`service/${slug}`, {
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
