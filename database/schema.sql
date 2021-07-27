set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "favorites" (
	"favoriteID" serial NOT NULL,
	"dislike" BOOLEAN NOT NULL,
	"watched" BOOLEAN NOT NULL,
	"userID" integer NOT NULL,
	"movieId" integer NOT NULL,
	CONSTRAINT "favorites_pk" PRIMARY KEY ("favoriteID")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "user" (
	"userID" serial NOT NULL,
	"password" TEXT NOT NULL,
	"username" TEXT NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userID") REFERENCES "user"("userID");
