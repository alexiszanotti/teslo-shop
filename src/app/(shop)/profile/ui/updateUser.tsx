"use client";

import { updateUser } from "@/actions";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateUserProps {
  session: any;
}

type FormInputs = {
  name: string;
  email: string;
};

export const UpdateUser = ({ session }: UpdateUserProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { update } = useSession();

  const refreshSession = async () => {
    await update();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: session.user.name,
      email: session.user.email,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    setErrorMessage("");

    // Server action
    const resp = await updateUser(session.user.id, data);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    refreshSession();
    //Se lo envia al home
    window.location.href = "/";
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='shadow-md bg-slate-50 px-8 py-4'>
      <div className='flex flex-col mb-2'>
        <label>Correo</label>
        <input
          type='email'
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            "border-red-500": errors.email,
          })}
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>
      <div className='flex flex-col mb-2'>
        <label>Nombre</label>
        <input
          type='text'
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            "border-red-500": errors.name,
          })}
          {...register("name", { required: true })}
        />
      </div>
      {errorMessage && <p className='text-red-500 mb-2'>{errorMessage}</p>}
      <button
        type='submit'
        className='bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-400'
      >
        Actualizar
      </button>
    </form>
  );
};

export default UpdateUser;
