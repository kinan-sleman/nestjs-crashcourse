import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValueForArticleTitle1764417185438 implements MigrationInterface {
    name = 'AddDefaultValueForArticleTitle1764417185438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '"2025-11-29T11:53:07.839Z"'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '"2025-11-29T11:53:07.839Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '2025-11-29 11:51:55.179'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-29 11:51:55.179'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" DROP DEFAULT`);
    }

}
