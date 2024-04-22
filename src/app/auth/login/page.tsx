"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/react";
import InputField from "@/components/InputField/InputField";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-semibold">Welcome</h1>
      <form className="flex flex-col gap-5" onSubmit={handleLogin}>
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
              label: "font-semibold",
            }}
          >
            Remember me
          </Checkbox>
          <Link className="text-sm text-primary-500 font-semibold" href="/">
            Forgot password?
          </Link>
        </div>
        <Button
          isLoading={loading}
          type="submit"
          disableRipple
          color="primary"
          radius="sm"
          className="font-medium"
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
        >
          Login
        </Button>
      </form>
    </>
  );
}
