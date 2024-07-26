import { NextResponse } from "next/server";


export async function GET(req: Request, resp: Response): Promise<any> {
  const { CATEGORY_URL } = process.env;
  const response = await fetch(CATEGORY_URL + "/categories");
  const data = await response.json()
  console.log("categories", data)

  return NextResponse.json(data);
}