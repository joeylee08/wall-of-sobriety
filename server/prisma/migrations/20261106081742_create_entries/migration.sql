-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "soberSince" DATE NOT NULL,
    "location" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);
