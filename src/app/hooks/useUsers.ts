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
    axios
      .get<User[]>("http://localhost:8080/users", {
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