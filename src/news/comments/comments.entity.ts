import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    } from 'typeorm';
    import { UsersEntity } from '../../users/users.entity'; 
    
    @Entity('news')
    export class CommentsEntity {
        @PrimaryGeneratedColumn()
        id: number;
        
        @Column('text')
        discription: string;

        @Column('text', {nullable: true})
        cover: string;

        @ManyToOne(() => UsersEntity, (user) => user.commets)
        user: UsersEntity;
       
        @OneToMany(() => CommentsEntity, (commets) => commets.user)
        commets: CommentsEntity[];

        @CreateDateColumn({ type: 'timestamp' })
        createdAt: Date;
    
        @UpdateDateColumn({ type: 'timestamp' })
        updatedAt: Date;
    }