import { Info } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-4 sm:px-8 bg-white shadow">
      <div className="flex items-center gap-2">
        <div
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent"
        >
          Track Finance
        </div>
      </div>
      <button
        title="Info"
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Info className="w-6 h-6 text-gray-700" />
      </button>
    </header>
  );
}
