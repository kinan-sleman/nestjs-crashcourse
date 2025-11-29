import { UserEntity } from "../user/user.entity";
import { BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "articles" })
export class ArticleEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    slug: string;
    @Column({ default: "" })
    description: string;
    @Column({ default: "" })
    title: string;
    @Column({ default: "" })
    body: string;
    @Column({ type: "timestamp", default: new Date() })
    createdAt: Date;
    @Column({ type: "timestamp", default: new Date() })
    updateAt: Date;
    @Column("simple-array")
    tagList: string[];
    @Column({ default: 0 })
    favoritesCount: number;
    @Column()
    authorId: number;
    // by eager true, this relation with always loaded
    @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
    @JoinColumn({ name: "authorId" })
    author: UserEntity;
    @BeforeUpdate()
    updateTimestamp() {
        this.updateAt = new Date();
    }
}