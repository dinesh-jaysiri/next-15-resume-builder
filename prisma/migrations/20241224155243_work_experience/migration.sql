-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "position" TEXT,
    "company" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
