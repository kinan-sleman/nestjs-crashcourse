import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtForTags1763840867727 implements MigrationInterface {
    name = 'AddCreatedAtForTags1763840867727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
    }

}
