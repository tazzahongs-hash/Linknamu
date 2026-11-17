import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 매 요청마다 DB에서 새로 읽도록 캐시하지 않습니다.
export const dynamic = "force-dynamic";

// 페이지가 열릴 때 호출되어 모든 링크의 클릭 수를 한 번에 돌려줍니다.
// 응답 모양: { counts: { github: 42, linkedin: 3, blog: 0 } }
export async function GET() {
  const counts: Record<string, number> = Object.fromEntries(links.map((link) => [link.id, 0]));

  try {
    const clicks = await getClicksCollection();
    if (clicks) {
      const docs = await clicks
        .find({ linkId: { $in: links.map((link) => link.id) } })
        .toArray();
      for (const doc of docs) counts[doc.linkId] = doc.count;
    }
    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 읽기 실패:", error);
    return NextResponse.json({ error: "클릭 수를 읽지 못했습니다" }, { status: 500 });
  }
}

// 링크 카드를 누르면 호출되어 해당 링크의 클릭 수를 1 올립니다.
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  if (typeof id !== "string" || !links.some((link) => link.id === id)) {
    return NextResponse.json({ error: "없는 링크" }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    if (!clicks) {
      // .env.local 에 MONGODB_URI 가 아직 없으면 저장하지 않고 넘어갑니다.
      return NextResponse.json({ saved: false });
    }
    await clicks.updateOne({ linkId: id }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ saved: false }, { status: 500 });
  }
}
