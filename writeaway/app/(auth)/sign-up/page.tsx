"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const SignUpSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 chars"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 chars"),
});

export default function SignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(data: z.infer<typeof SignUpSchema>) {
    setErrorMessage(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setErrorMessage(error || "Something went wrong");
      return;
    }

    router.push("/sign-in");
  }

  return (
    <main className="w-full max-w-sm mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

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

        <Button type="submit" className="w-full">Create Account</Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-600 hover:underline font-semibold">
            Sign In
          </a>
        </p>
      </div>
    </main>
  );
}
