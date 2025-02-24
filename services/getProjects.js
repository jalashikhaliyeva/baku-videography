import { instanceAxios } from "@/shared/instanceAxios";

export const getProjects = async (lang) => {
  try {
    const response = await instanceAxios.get("ourworks", {
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
