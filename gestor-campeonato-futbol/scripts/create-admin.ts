import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

async function createAdmin() {
  const prisma = new PrismaClient();

  try {
    // Check if admin user already exists
    const existingUser = await prisma.usuario.findUnique({
      where: { username: "admin" },
    });

    if (existingUser) {
      console.log("❌ El usuario 'admin' ya existe");
      return;
    }

    // Hash the password
    const hashedPassword = await hash("galaxia", 10);

    // Create admin user
    const admin = await prisma.usuario.create({
      data: {
        username: "admin",
        password: hashedPassword,
        nombre: "Administrador",
        activo: true,
      },
    });

    console.log("✅ Usuario administrador creado exitosamente");
    console.log("   Username: admin");
    console.log("   Password: galaxia");
    console.log("   ID:", admin.id);
  } catch (error) {
    console.error("❌ Error al crear el usuario administrador:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
