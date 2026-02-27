/*
  Warnings:

  - Added the required column `userId` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Barber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Barber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Barber" ("active", "createdAt", "id", "name", "updatedAt") SELECT "active", "createdAt", "id", "name", "updatedAt" FROM "Barber";
DROP TABLE "Barber";
ALTER TABLE "new_Barber" RENAME TO "Barber";
CREATE UNIQUE INDEX "Barber_userId_key" ON "Barber"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
