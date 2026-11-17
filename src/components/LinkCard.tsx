"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  // 페이지를 떠나도 전송이 끊기지 않도록 sendBeacon으로 클릭을 알립니다.
  function recordClick() {
    const body = JSON.stringify({ id: link.id });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/click", { method: "POST", body, keepalive: true });
    }
    onClick?.();
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      // 글래스 모피즘: 반투명 흰 판 + 뒤 배경 흐림 + 윗변 빛 반사. 호버는 살짝 밝아지는 정도만.
      // 제목은 가운데, 클릭 수는 오른쪽 끝에 작게. 좌우 여백을 넉넉히 둬서 제목과 겹치지 않게 합니다.
      className="relative block w-full rounded-3xl border border-white/60 bg-white/35 px-16 py-[18px] text-center text-[15px] font-semibold tracking-tight text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_-12px_rgba(190,110,70,0.35)] backdrop-blur-xl transition-colors duration-300 hover:bg-white/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 active:bg-white/65"
    >
      {link.title}
      <span className="absolute top-1/2 right-6 -translate-y-1/2 text-xs font-normal tabular-nums text-stone-500">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
