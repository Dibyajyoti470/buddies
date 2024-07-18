"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/react";
import InputField from "@/components/InputField";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials.user);
      router.push("/chat");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-medium">Welcome</h1>
      <form className="flex flex-col gap-5 mt-3" onSubmit={handleLogin}>
        <InputField
          isRequired
          type="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        ></InputField>
        <InputField
          isRequired
          type="password"
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          showTogglePasswordVisibility={true}
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        ></InputField>
        <div className="flex justify-between items-center">
          <Checkbox
            defaultSelected
            size="sm"
            radius="sm"
            classNames={{
              wrapper: "rounded before:rounded after:rounded",
              icon: "w-4 h-2.5 stroke-2",
              label: "",
            }}
          >
            Remember me
          </Checkbox>
          <Link className="text-sm text-primary-500" href="/">
            Forgot password?
          </Link>
        </div>
        <Button
          isLoading={isLoading}
          type="submit"
          disableRipple
          color="primary"
          radius="sm"
          className="font-medium"
        >
          {isLoading || "Login"}
        </Button>
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-primary-500" href="/auth/create-account">
            Create one here.
          </Link>{" "}
        </p>
      </form>
    </>
  );
}
