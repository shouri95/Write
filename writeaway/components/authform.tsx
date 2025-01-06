// File: components/authform.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthVariant = "login" | "register";

interface AuthFormProps {
  variant: AuthVariant;
}

export default function AuthForm({ variant }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // For register, you might want a "name" or "confirm password", etc.
  const [name, setName] = useState("");

  const [error, setError] = useState<string | null>(null);

  const isLogin = variant === "login";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      // 1. Sign in with NextAuth credentials
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/"); // or wherever
      }
    } else {
      // 2. Register the user
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        if (!res.ok) {
          const { error } = await res.json();
          setError(error || "Registration failed.");
          return;
        }
        // Once successfully registered, log them in or direct to sign-in
        // Let's just push to /sign-in:
        router.push("/(auth)/sign-in");
      } catch (err) {
        setError("Something went wrong");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      {!isLogin && (
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" className="w-full">
        {isLogin ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
}
