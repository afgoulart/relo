import { NextResponse } from "next/server";

export async function POST(req: Request, resp: Response): Promise<any> {
  const { ANNOTATION_API } = process.env;
  const body = await req.json();
  const response = await fetch(ANNOTATION_API + "/annotations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    try {
      const responseData = await response.json();
      return NextResponse.json({
        status: response.status,
        error: false,
        message: "Annotation submitted successfully",
        data: responseData, // Adicionado para incluir os dados na resposta de sucesso
      });
    } catch (error) {
      // Tratamento de erro se a resposta não for um JSON válido
      return NextResponse.json({
        status: 500,
        error: true,
        message: "Failed to parse JSON response",
      });
    }
  } else {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = "Failed to parse error response as JSON";
    }

    return NextResponse.json({
      status: response.status,
      error: true,
      data: errorData,
      message: "Annotation not submitted",
    });
  }
}
