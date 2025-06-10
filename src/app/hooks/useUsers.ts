'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/users`;
    axios
      .get<User[]>(API_URL, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN || ""}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching users");
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
}