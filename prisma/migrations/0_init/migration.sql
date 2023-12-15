-- CreateTable
CREATE TABLE "personas" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "birth_date" DATE,
    "email" VARCHAR(100),

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id")
);

