'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Comment {
  id: number;
  ideaId: number;
  userId: number;
  message: string;
  createdAt: string;
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  createdBy: User;
  votes: number;
  votedBy: string[]
  createdAt: string;
  comments: Comment[];
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/ideas`;
const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN || ""}`,
};

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all ideas
  useEffect(() => {
    axios
      .get<Idea[]>(API_URL, { headers: AUTH_HEADER })
      .then((res) => {
        setIdeas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching ideas");
        setLoading(false);
      });
  }, []);

  // Create a new idea
  const createIdea = async (data: { title: string; description: string; createdById: number }) => {
    const res = await axios.post<Idea>(API_URL, data, { headers: AUTH_HEADER });
    setIdeas((prev) => [...prev, res.data]);
    return res.data;
  };

  // Get idea by id
  const getIdeaById = async (id: number) => {
    const res = await axios.get<Idea>(`${API_URL}/${id}`, { headers: AUTH_HEADER });
    return res.data;
  };

// Vote for an idea
const voteIdea = async (id: number, userName: string) => {
  const res = await axios.post<{ votes: number; votedBy: string[] }>(
    `${API_URL}/${id}/vote`,
    { userName }, // send userName in the body
    { headers: AUTH_HEADER }
  );
  setIdeas((prev) =>
    prev.map((idea) =>
      idea.id === id
        ? { ...idea, votes: res.data.votes, votedBy: res.data.votedBy }
        : idea
    )
  );
  return res.data.votes;
};

  // Add a comment to an idea
  const addComment = async (id: number, data: { userId: number; message: string }) => {
    const res = await axios.post<Comment>(`${API_URL}/${id}/comments`, data, { headers: AUTH_HEADER });
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, comments: [...idea.comments, res.data] } : idea
      )
    );
    return res.data;
  };

  return { ideas, loading, error, createIdea, getIdeaById, voteIdea, addComment };
}