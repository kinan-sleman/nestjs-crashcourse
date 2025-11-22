import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt"
@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    // add default to be nullable
    @Column({default: ''})
    bio: string;
    // add default to be nullable
    @Column({default: ''})
    image: string;
    @Column()
    password: string;
    // Add method that working before Insert & Update
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
        }
        
    }
}