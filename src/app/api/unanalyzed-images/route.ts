import { NextResponse } from "next/server";

interface Image {
  id: string;
  url: string;
}

export async function GET(req: Request, resp: Response): Promise<any> {
  const { IMAGE_URL } = process.env;
  const response = await fetch(IMAGE_URL + "/unalalyzed-images");
  const data = await response.json();

  return NextResponse.json(data);
}