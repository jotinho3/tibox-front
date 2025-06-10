'use client';

import Link from "next/link";
import { useIdeas } from "@/app/hooks";
import { FaSearch, FaUserCircle, FaThumbsUp, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Loader } from "@/app/components";

export function Home() {
  const { ideas, loading } = useIdeas();
  const [search, setSearch] = useState("");

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader text="Voltando ao início..." />;

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50 dark:bg-gray-950">
      <div className="flex w-full max-w-2xl mb-8 gap-4 items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Procure por ideias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Link href="/new-idea">
          <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            <FaPlus /> Criar Ideia
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-8 justify-center items-center w-full">
        {filteredIdeas.length === 0 && (
          <div className="text-gray-500 text-lg mt-12">No ideas found.</div>
        )}
        {filteredIdeas.map((idea) => (
          <Link
            key={idea.id}
            href={`/idea-details/${idea.id}`}
            className="w-80"
            style={{ textDecoration: "none" }}
          >
            <div
              className="flex flex-col bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 w-80 h-72 cursor-pointer hover:shadow-2xl transition"
              style={{ minHeight: "18rem", maxHeight: "18rem" }}
            >
              <div className="flex items-center mb-3">
                <FaUserCircle className="text-2xl text-blue-600 mr-2" />
                <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {typeof idea.createdBy === "object" ? idea.createdBy.name : idea.createdBy}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white truncate">
                {idea.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 overflow-hidden" style={{ flex: 1 }}>
                {idea.description.length > 120
                  ? idea.description.slice(0, 120) + "..."
                  : idea.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="flex items-center text-sm text-gray-500">
                  <FaThumbsUp className="mr-1" /> {idea.votes}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(idea.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}