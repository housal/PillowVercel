import Image from "next/image"
import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center">
      <div className="h-8 relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/P_S%20Logo%20Single.jpg-9Z97yHjICN2I5SNRtDQg9igRSo1vMA.jpeg"
          alt="Pillow & Space"
          width={120}
          height={40}
          style={{ height: "100%", width: "auto" }}
          priority
        />
      </div>
    </Link>
  )
}

