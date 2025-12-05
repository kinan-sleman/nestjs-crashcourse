import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserFavoritesRelation1764460790324 implements MigrationInterface {
    name = 'AddUserFavoritesRelation1764460790324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '"2025-11-29T23:59:53.373Z"'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '"2025-11-29T23:59:53.373Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updateAt" SET DEFAULT '2025-11-29 23:33:50.036'`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-29 23:33:50.036'`);
    }

}
