import { GalleryVerticalEnd } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex flex-col gap-20 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Basepop
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            {children}
          </div>
        </div>
      </div>
  )
}