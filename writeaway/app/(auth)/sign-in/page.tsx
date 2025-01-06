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

const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export default function SignInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
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

    // After signing in, go to /home
    router.push("/home");
  }

  return (
    <main className="w-full max-w-sm mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
