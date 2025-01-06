"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Zod schema for sign up
const SignUpSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignUpFormValues = z.infer<typeof SignUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
  });

  // On form submit, POST to our register endpoint
  async function onSubmit(data: SignUpFormValues) {
    setErrorMessage(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setErrorMessage(error || "Something went wrong.");
      return;
    }

    // If success, go to sign-in
    router.push("/(auth)/sign-in");
  }

  return (
    <main className="w-full max-w-sm mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>
    </main>
  );
}
