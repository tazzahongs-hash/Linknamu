import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-40 w-40 overflow-hidden rounded-full border border-neutral-300 bg-neutral-100 sm:h-48 sm:w-48">
        {imageUrl ? (
          <Image src={imageUrl} alt={`${name} 프로필 사진`} fill className="object-cover" priority />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-5xl font-semibold text-neutral-500">
            {name.slice(0, 1)}
          </span>
        )}
      </div>
      <h1 className="mt-5 text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-base text-neutral-600">{bio}</p>
    </header>
  );
}
