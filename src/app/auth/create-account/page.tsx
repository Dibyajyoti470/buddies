"use client";

import InputField from "@/components/InputField";
import { auth, db } from "@/firebase";
import { Button, Checkbox } from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateAccount() {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const notify = (message: string) => toast(message);

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name: "",
        email,
        blocked: [],
      });

      notify("Your account has been successfully created.");
      router.push(`/setup-profile/${user.uid}`);
    } catch (error) {
      console.log(error);
      notify("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-medium">Create account</h1>
      <form className="flex flex-col gap-5 mt-3" onSubmit={handleCreateAccount}>
        {/* <InputField
          isRequired
          type="text"
          label="Name"
          labelPlacement="outside"
          placeholder="Enter your name"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        ></InputField> */}
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
          I agree to the terms and conditions.
        </Checkbox>
        <Button
          isLoading={isLoading}
          type="submit"
          disableRipple
          color="primary"
          radius="sm"
          className="font-medium"
        >
          {isLoading || "Create"}
        </Button>
        <Toaster position="bottom-center" />
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-primary-500" href="/auth/login">
            Login here.
          </Link>
        </p>
      </form>
    </>
  );
}
