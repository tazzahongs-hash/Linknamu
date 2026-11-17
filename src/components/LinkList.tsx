"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

// 링크 카드 목록. 페이지가 열리면 모든 링크의 클릭 수를 한 번에 받아 옵니다.
// 받기 전에는 모두 0회로 보이고, 받으면 실제 값으로 바뀝니다.
export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (!cancelled && data?.counts) {
          const fetched = data.counts;
          // 받는 사이에 이미 누른 카드가 있으면 그만큼 더해 둡니다.
          setCounts((prev) => {
            const merged = { ...fetched };
            for (const [id, n] of Object.entries(prev)) merged[id] = (merged[id] ?? 0) + n;
            return merged;
          });
        }
      })
      .catch(() => {
        // 못 받아 오면 0회 그대로 둡니다.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 누르는 즉시 화면의 숫자도 1 올립니다.
  function handleClick(id: string) {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <ul className="mt-10 flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
