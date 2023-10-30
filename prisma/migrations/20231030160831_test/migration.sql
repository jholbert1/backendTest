/*
  Warnings:

  - You are about to drop the `AuthToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_userId_fkey";

-- DropTable
DROP TABLE "AuthToken";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "C001_user" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "C001_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "C002_auth_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "C002_auth_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "C001_user_username_key" ON "C001_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "C001_user_email_key" ON "C001_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "C002_auth_token_token_key" ON "C002_auth_token"("token");

-- AddForeignKey
ALTER TABLE "C002_auth_token" ADD CONSTRAINT "C002_auth_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "C001_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
