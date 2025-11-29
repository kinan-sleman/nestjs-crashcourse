import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArticleAuthorRelation1764415537416 implements MigrationInterface {
    name = 'AddArticleAuthorRelation1764415537416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "authorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '"2025-11-29T11:25:39.790Z"'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '"2025-11-29T11:25:39.790Z"'`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '2025-11-23 20:11:41.238'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-23 20:11:41.238'`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "authorId"`);
    }

}
