'use server';
import { ImageType } from "@/types";

export const fetchUnanalyzedImages = async () => {
  const { IMAGE_URL } = process.env;
  const response = await fetch(IMAGE_URL + "/unalalyzed-images");
  const data = await response.json();

  return data;
};

export const fetchCategories = async () => {
  const { CATEGORY_URL } = process.env;
  const response = await fetch(CATEGORY_URL + "/categories");
  const data = await response.json()

  return data;
};

export const handleComplete = async (image: { id: any; }, category: { id: any; }, boundingBox: any) => {
  const APP_URL = process.env.APP_URL;
  const response = await fetch(
    `${APP_URL}/api/annotations`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageId: image.id,
        annotations: [
          {
            categoryId: category.id,
            boundingBoxes: [boundingBox],
          },
        ],
      }),
    }
  );
  if (response.ok) {
    return {
      status: response.status,
      error: false,
      message: "Annotation submitted successfully"
    };
  }

  const data = await response.json();

  return {
    status: response.status,
    error: true,
    data,
    message: "Annotation not submitted"
  };
}

export const handleDiscard = async (image: ImageType) => {
  const APP_URL = process.env.APP_URL;


  const response = await fetch(
    `${APP_URL}/api/annotations/${image.id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.ok) {
    return {
      status: response.status,
      message: "Annotation discarded"
    }
  }

  return {
    status: response.status,
    error: true,
    message: "Annotation not discarded"
  }
};