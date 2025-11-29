import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValueForArticleDescription1764416955825 implements MigrationInterface {
    name = 'AddDefaultValueForArticleDescription1764416955825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '"2025-11-29T11:49:18.675Z"'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '"2025-11-29T11:49:18.675Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '2025-11-29 11:25:39.79'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-29 11:25:39.79'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "description" DROP DEFAULT`);
    }

}
