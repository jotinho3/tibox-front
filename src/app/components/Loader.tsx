import { FaSpinner } from "react-icons/fa";

export function Loader({ text = "Carregando, aguarde..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <FaSpinner className="animate-spin text-blue-600 text-5xl mb-4" />
      <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold animate-pulse">
        {text}
      </span>
    </div>
  );
}