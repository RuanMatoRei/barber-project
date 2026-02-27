-- CreateTable
CREATE TABLE "BarberProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "photoUrl" TEXT,
    "description" TEXT,
    "specialty" TEXT,
    "isWalkIn" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "BarberProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BarberProfile_userId_key" ON "BarberProfile"("userId");
