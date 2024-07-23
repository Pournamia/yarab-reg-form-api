import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 50 })
    firstName: string
    @Column("varchar", { length: 50 })
    lastName: string
    @Column("varchar", { length: 50})
    email: string
    @Column("int", { length: 25 })
    phoneNumber: string
    @Column("varchar", { length: 50})
    postCode: string
}