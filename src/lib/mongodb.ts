import { MongoClient } from "mongodb";

// 개발 중 파일을 고칠 때마다 접속이 새로 생기지 않도록 하나만 만들어 재사용합니다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 접속에 실패하면 다음 요청 때 다시 시도하도록 비워 둡니다.
      globalForMongo.mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo.mongoClientPromise;
}

// 클릭 수를 담는 컬렉션. 문서 모양: { linkId: "github", count: 42 }
export async function getClicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client
    .db(process.env.MONGODB_DB || "linknamu")
    .collection<{ linkId: string; count: number }>("clicks");
}
