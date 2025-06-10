"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useIdeas } from "@/app/hooks";
import { Idea, Comment } from "@/app/hooks/useIdeas";
import { useUsers } from "@/app/hooks/useUsers";
import { FaUserCircle, FaRegCommentDots, FaThumbsUp } from "react-icons/fa";
import { Loader } from "@/app/components";

export default function IdeaDetails() {
  const { id } = useParams();
  const { getIdeaById, addComment, voteIdea } = useIdeas();
  const { users } = useUsers();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liking, setLiking] = useState(false);
  const [likeUserId, setLikeUserId] = useState("");
  const [likeError, setLikeError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const numericId = Array.isArray(id) ? Number(id[0]) : Number(id);
    getIdeaById(numericId)
      .then((data) => setIdea(data))
      .catch(() => setError("Idea not found."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

 const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !userId || !idea) return;
    setSubmitting(true);
    try {
      const newComment: Comment = await addComment(idea.id, {
        userId: Number(userId),
        message: comment,
      });
      setIdea({
        ...idea,
        comments: [...idea.comments, newComment],
      });
      setComment("");
      setUserId("");
    } catch (_err) {
      const err = _err as { response?: { data?: { error: string } } };
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Like (vote) functionality
  const handleLike = async (e: React.FormEvent) => {
    e.preventDefault();
    setLikeError(null);
    if (!likeUserId || !idea) {
      setLikeError("Please select a user to like.");
      return;
    }
    setLiking(true);
    try {
      const user = users.find((u) => u.id === Number(likeUserId));
      if (!user) {
        setLikeError("User not found.");
        setLiking(false);
        return;
      }
      // Call voteIdea with idea.id and user.name
      const votes = await voteIdea(idea.id, user.name);
      setIdea({
        ...idea,
        votes,
        votedBy: idea.votedBy ? [...idea.votedBy, user.name] : [user.name],
      });
      setLikeUserId("");
    } catch (err: unknown) { // changed from 'any' to 'unknown'
      if (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "error" in err.response.data) {
        setLikeError((err.response as { data: { error: string } }).data.error);
      } else {
        setLikeError("Failed to like/vote.");
      }
    } finally {
      setLiking(false);
    }
  };

  if (loading) return <Loader text="Carregando ideias..." />;

  if (error || !idea) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-red-600">{error || "Idea not found."}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 w-full max-w-2xl mb-8">
        <div className="flex items-center mb-4">
          <FaUserCircle className="text-3xl text-blue-600 mr-3" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {typeof idea.createdBy === "object" ? idea.createdBy.name : idea.createdBy}
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{idea.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{idea.description}</p>
        <div className="flex items-center gap-6 mb-2">
          <span className="flex items-center text-gray-500 dark:text-gray-400">
            <FaThumbsUp className="mr-1" /> {idea.votes} votos
          </span>
          <span className="flex items-center text-gray-500 dark:text-gray-400">
            <FaRegCommentDots className="mr-1" /> {idea.comments.length} comments
          </span>
        </div>
        <span className="text-xs text-gray-400">
          Created at {new Date(idea.createdAt).toLocaleString()}
        </span>
        {/* Like/Vote Section */}
       <form onSubmit={handleLike} className="flex items-center gap-3 mt-6">
          <select
            name="likeUserId"
            value={likeUserId}
            onChange={(e) => {
              setLikeUserId(e.target.value);
              setUserId(e.target.value); // Set comment userId as well for better UX
            }}
            required
            className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
          >
            <option value="" disabled>
              Selecione o Usuário.
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={liking}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            <FaThumbsUp /> {liking ? "Votando..." : "Votar"}
          </button>
        </form>
        {likeError && <div className="text-red-600 mt-2">{likeError}</div>}
      </div>

      {/* Comments Section */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 w-full max-w-2xl mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
          <FaRegCommentDots className="mr-2 text-white" /> Comentários
        </h3>
        {idea.comments.length === 0 && (
          <div className="text-gray-500 mb-4">Sem comentários ainda.</div>
        )}
        <ul className="mb-6 space-y-4">
          {idea.comments.map((c) => {
            const user = users.find((u) => u.id === c.userId);
            return (
              <li key={c.id} className="flex items-start gap-3">
                <FaUserCircle className="text-2xl text-blue-500 mt-1" />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {user ? user.name : "User"}{" "}
                    <span className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">{c.message}</div>
                </div>
              </li>
            );
          })}
        </ul>
        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
          <select
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
          >
            <option value="" disabled>
              Selecione o Usuário
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <textarea
            name="comment"
            placeholder="Adicione seu comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
            rows={3}
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Comentar"}
          </button>
        </form>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
    </div>
  );
}