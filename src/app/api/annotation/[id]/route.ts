import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any): Promise<any> {
  const { ANNOTATION_URL } = process.env;
  const { id } = params;
  const response = await fetch(ANNOTATION_URL + `/annotations/${id}`);

  if (response.ok) {
    return NextResponse.json({
      status: response.status,
      error: false,
      data: await response.json(),
    });
  }

  return NextResponse.json({
    status: response.status,
    error: true,
    data: await response.json(),
    message: "Failed to fetch annotation"
  });

}

export async function DELETE(req: NextRequest, { params }: any): Promise<any> {
  const { ANNOTATION_API } = process.env;
  const { id } = params;
  const response = await fetch(ANNOTATION_API + `/annotations/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageId: id,
      annotations: [],
    }),
  });

  if (response.ok) {
    return NextResponse.json({
      status: response.status,
      error: false,
      message: "Annotation deleted successfully"
    });
  }

  return NextResponse.json({
    status: response.status,
    error: true,
    data: await response.json(),
    message: "Annotation not deleted"
  });
}