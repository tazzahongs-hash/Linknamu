"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  // 페이지를 떠나도 전송이 끊기지 않도록 sendBeacon으로 클릭을 알립니다.
  function recordClick() {
    const body = JSON.stringify({ id: link.id });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/click", { method: "POST", body, keepalive: true });
    }
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      className="block w-full rounded-xl border border-neutral-400 bg-white px-5 py-4 text-center font-medium transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
    >
      {link.title}
    </a>
  );
}
