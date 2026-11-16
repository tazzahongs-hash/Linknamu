import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

// wireframe.png 모양: 위에 원형 사진·이름·한 줄 소개, 아래에 링크 카드 3개를 세로로.
export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center px-8 pt-16 pb-16 sm:px-10 sm:pt-24">
      {/* 유리 카드 뒤로 비칠 은은한 빛 번짐 (장식용) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl" />
      </div>
      <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
      <ul className="mt-10 flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
