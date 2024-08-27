"use server";

import prisma from "@/lib/prisma";

interface UpdateUser {
  email?: string;
  name?: string;
}

export const updateUser = async (userId: string, data: UpdateUser) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return {
      message: "Usuario actualizado correctamente",
      ok: true,
    };
  } catch (error) {
    console.error(error);

    return {
      message: "Ocurrió un error al actualizar el usuario",
      ok: false,
    };
  }
};
