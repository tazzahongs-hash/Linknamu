// 프로필과 링크 내용은 이 파일만 고치면 됩니다.
// 지금 값은 모두 보여 주기용 더미 값입니다.

export type LinkItem = {
  id: string; // 클릭 수를 셀 때 쓰는 고유 이름 (영문, 바꾸지 마세요)
  title: string;
  url: string;
};

export const profile = {
  name: "김재홍",
  bio: "AI 꿈나무",
  // 진짜 사진을 public 폴더에 넣고 "/파일이름.jpg"로 바꾸세요.
  imageUrl: "/profile-placeholder.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "Github", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "Blog", url: "https://example.com/" },
];
