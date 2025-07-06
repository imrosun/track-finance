import { Info } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-4 sm:px-8 bg-white shadow 
         mx-auto w-full px-2 sm:px-6 py-6 gap-6">
      <div className="flex items-center max-w-5xl mx-auto w-full px-2">
        <div
          className="flex items-center cursor-pointer
            text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-yellow-500 
            to-amber-500 bg-clip-text text-transparent tracking-wide"
        >
          Track Finance
        </div>
      </div>
      <button
        title="Info"
        className="p-2 rounded-full hover:bg-gray-100 transition max-w-5xl mx-auto px-2 "
      >
        <Info className="w-6 h-6 text-gray-700" />
      </button>
    </header>
  );
}
