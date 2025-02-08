import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    fullName!: string;

    @Column({ type: "date" })
    birthDate!: string;

    @Column({ unique: true })
    phone!: string;

    @Column({ default: "пациент" })
    role!: string;
}
