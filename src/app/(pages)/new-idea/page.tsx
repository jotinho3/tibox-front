"use client";
import { useState } from "react";
import { useIdeas } from "@/app/hooks/useIdeas";
import { useUsers } from "@/app/hooks/useUsers";
import { FaLightbulb, FaUserCircle, FaEdit, FaPaperPlane } from "react-icons/fa";
import { Loader } from "@/app/components";

export default function NewIdea() {
  const { createIdea } = useIdeas();
  const { users, loading: usersLoading } = useUsers();

  const [form, setForm] = useState({
    title: "",
    description: "",
    createdById: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description || !form.createdById) return;
    await createIdea({
      title: form.title,
      description: form.description,
      createdById: Number(form.createdById),
    });
    setSubmitted(true);
    setForm({ title: "", description: "", createdById: "" });
  }

    if (usersLoading) return <Loader text="Carregando usuários..." />;

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <FaLightbulb className="text-3xl text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submit a New Idea</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div>
            <label className="flex items-center gap-2 mb-1 font-semibold text-gray-700 dark:text-gray-200">
              <FaEdit className="text-blue-500" /> Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
              className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white w-full"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 mb-1 font-semibold text-gray-700 dark:text-gray-200">
              <FaEdit className="text-blue-500" /> Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white w-full"
              rows={4}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 mb-1 font-semibold text-gray-700 dark:text-gray-200">
              <FaUserCircle className="text-blue-500" /> Created By
            </label>
            <select
              name="createdById"
              value={form.createdById}
              onChange={handleChange}
              required
              className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white w-full"
              disabled={usersLoading}
            >
              <option value="" disabled>
                {usersLoading ? "Loading users..." : "Select User"}
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            <FaPaperPlane /> Submit Idea
          </button>
          {submitted && (
            <span className="text-green-600 mt-2">Idea submitted!</span>
          )}
        </form>
      </div>
    </div>
  );
}