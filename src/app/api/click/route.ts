import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

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

  const clientPromise = getMongoClient();
  if (!clientPromise) {
    // .env.local 에 MONGODB_URI 가 아직 없으면 저장하지 않고 넘어갑니다.
    return NextResponse.json({ saved: false });
  }

  try {
    const client = await clientPromise;
    await client
      .db(process.env.MONGODB_DB ?? "linknamu")
      .collection("clicks")
      .updateOne({ linkId: id }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ saved: false }, { status: 500 });
  }
}
