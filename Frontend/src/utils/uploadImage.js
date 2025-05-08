import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imgFile) => {
  const formData = new FormData();

  formData.append("image", imgFile);

  try {
    const res = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error while uploading image:", error);
    throw error;
  }
};

export default uploadImage;
