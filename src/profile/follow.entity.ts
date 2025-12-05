import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "follows"})
export class FollowEneity {
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column()
    followerId: number;
    @Column()
    followingId: number;
}