import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

/** AI Studio 무료 티어에서 모델마다 할당(quota)이 다릅니다. 2.0-flash에서 limit:0이면 다른 모델을 시도하세요. */
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

function chatStreamErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const msg = (error as { message: unknown }).message;
    if (typeof msg === "string" && msg.length > 0) {
      return msg;
    }
  }
  return "채팅 응답 처리 중 오류가 발생했습니다.";
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      {
        error:
          "GOOGLE_GENERATIVE_AI_API_KEY가 설정되지 않았습니다. .env.local을 확인하세요.",
      },
      { status: 503 },
    );
  }

  let body: { messages: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const { messages } = body;
  if (!Array.isArray(messages)) {
    return Response.json(
      { error: "messages 배열이 필요합니다." },
      { status: 400 },
    );
  }

  const modelMessages = await convertToModelMessages(messages);

  const modelId =
    process.env.GOOGLE_GENERATIVE_AI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console -- 개발 중 실제 호출 모델 확인용
    console.info("[Buff /api/chat] Gemini model:", modelId);
  }

  const result = streamText({
    model: google(modelId),
    maxRetries: 0,
    system: `당신은 Buff 플랫폼의 전술 코치다. 한국어로 답한다.
짧고 실전적인 팁 위주로 답하되, 필요하면 단계(1. 2. 3.)로 구조화한다.
추측이 필요하면 '가정'이라고 명시한다. 위험한 악용(치팅/핵 등) 요청은 정중히 거절한다.`,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse({
    onError: (error: unknown): string => {
      console.error("[chat]", error);
      return chatStreamErrorMessage(error);
    },
  });
}
