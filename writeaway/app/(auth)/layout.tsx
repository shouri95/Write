import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen w-full">
      {/* Left side: Form content */}
      <div className="flex-1 flex items-center justify-center">{children}</div>

      {/* Right side: Image */}
      <div className="hidden md:flex md:w-[500px] items-center justify-center bg-gray-50">
        <Image
          src="/icons/auth-image.svg"
          alt="Auth image"
          width={300}
          height={300}
          className="rounded-l-xl object-contain"
        />
      </div>
    </section>
  );
}
