CREATE TABLE "favorites" (
	"favoriteID" serial NOT NULL,
	"userID" integer NOT NULL,
	"posterUrl" TEXT NOT NULL,
	"title" TEXT NOT NULL,
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



CREATE TABLE "dislikes" (
	"dislikeID" serial NOT NULL,
	"userID" integer NOT NULL,
	"posterUrl" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	CONSTRAINT "dislikes_pk" PRIMARY KEY ("dislikeID")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userID") REFERENCES "user"("userID");


ALTER TABLE "dislikes" ADD CONSTRAINT "dislikes_fk0" FOREIGN KEY ("userID") REFERENCES "user"("userID");
