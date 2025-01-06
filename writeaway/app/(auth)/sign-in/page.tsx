"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Zod schema for sign in
const SignInSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignInFormValues = z.infer<typeof SignInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
  });

  // On form submit, call signIn("credentials")
  async function onSubmit(data: SignInFormValues) {
    setErrorMessage(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    // If successful, redirect to your protected area
    router.push("/(root)");
  }

  return (
    <main className="w-full max-w-sm mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          Sign In
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/sign-up"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
