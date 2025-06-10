import { FaLightbulb } from "react-icons/fa";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full py-4 px-8 bg-gray-100 dark:bg-gray-900 shadow">
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <FaLightbulb className="text-blue-400 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ideias</h1>
        </Link>
      </div>
    </header>
  );
}