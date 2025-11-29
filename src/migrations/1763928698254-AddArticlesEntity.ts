import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArticlesEntity1763928698254 implements MigrationInterface {
    name = 'AddArticlesEntity1763928698254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2025-11-23T20:11:41.238Z"', "updateAt" TIMESTAMP NOT NULL DEFAULT '"2025-11-23T20:11:41.238Z"', "tagList" text NOT NULL, "favoritesCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
