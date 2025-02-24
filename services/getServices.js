import { instanceAxios } from "@/shared/instanceAxios";

export const getServices = async (lang) => {
  try {
    const response = await instanceAxios.get("services", {
      headers: {
        "Accept-Language": lang,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching landing info:", error);
    throw error;
  }
};
