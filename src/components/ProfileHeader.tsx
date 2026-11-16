import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 따뜻한 그림자로 살짝 떠 있는 느낌 */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-orange-100 shadow-[0_12px_30px_-10px_rgba(190,110,70,0.55)] ring-4 ring-white sm:h-32 sm:w-32">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} 프로필 사진`}
            fill
            sizes="(min-width: 640px) 128px, 112px"
            className="object-cover object-top"
            priority
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-semibold text-orange-400">
            {name.slice(0, 1)}
          </span>
        )}
      </div>
      <h1 className="mt-5 text-xl font-bold tracking-tight text-stone-900">{name}</h1>
      <p className="mt-1.5 text-sm text-stone-500">{bio}</p>
    </header>
  );
}
