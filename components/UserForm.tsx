"use client";

import { userSchema } from "@/validationSchemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Form = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<Form>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          ...user,
          password: "",
        }
      : {
          name: "",
          password: "",
          role: "",
          username: "",
        },
  });

  const onSubmit = async (values: Form) => {
    try {
      setError("");

      if (user) {
        await axios.patch("/api/users/" + user.id, values);
      } else {
        await axios.post("/api/users", values);
      }

      router.refresh();
    } catch (err) {
      console.log(err);
      setError("Unknown error occured");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "flex-start",
      }}
    >
      <label>
        Name
        <input {...register("name")} />
      </label>
      {errors.name ? <span>{errors.name.message}</span> : null}
      <label>
        Username
        <input {...register("username")} />
      </label>
      {errors.username ? <span>{errors.username.message}</span> : null}
      <label>
        Password
        <input {...register("password")} type="password" />
      </label>
      {errors.username ? <span>{errors.username.message}</span> : null}
      <label>
        Role
        <select {...register("role")}>
          <option value="" disabled hidden />
          <option value="ADMIN">Admin</option>
          <option value="TECH">Tech</option>
          <option value="USER">User</option>
        </select>
      </label>
      {errors.role ? <span>{errors.role.message}</span> : null}
      {error ? <span>{error}</span> : null}
      <button disabled={isSubmitting} type="submit">
        {user ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;
