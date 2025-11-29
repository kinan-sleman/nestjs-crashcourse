import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValueForArticleBody1764417112574 implements MigrationInterface {
    name = 'AddDefaultValueForArticleBody1764417112574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '"2025-11-29T11:51:55.179Z"'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '"2025-11-29T11:51:55.179Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '2025-11-29 11:49:18.675'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-29 11:49:18.675'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`);
    }

}
