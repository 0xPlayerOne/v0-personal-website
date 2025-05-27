import Link from "next/link"

export default function RetroNavbar() {
  return (
    <nav className="bg-black py-2">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 font-['Press_Start_2P'] text-[10px] sm:text-xs md:text-sm lg:text-base">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="text-white hover:text-gray-300">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
