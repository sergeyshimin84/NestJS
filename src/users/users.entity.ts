import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    } from 'typeorm';
    import { NewsEntity } from 'src/news/news.entity';
    import { CommentsEntity } from '../news/comments/comments.entity';
    import { IsEnum } from 'class-validator';
    import { Role } from './dtos/role.enum';
    
    @Entity('news')
    export class UsersEntity {
        @PrimaryGeneratedColumn()
        id: number;
        
        @Column('text')
        firstName: string;

        @Column('text')
        email: string;
        
        @Column('text')
        password: string;

        @Column('text')
        @IsEnum(Role)
        roles: Role;
        
        @OneToMany(() => NewsEntity, (news) => news.user)
        news: NewsEntity[];

        @OneToMany(() => CommentsEntity, (commets) => commets.user)
        commets: CommentsEntity[];

        @CreateDateColumn({ type: 'timestamp' })
        createdAt: Date;
        
        @UpdateDateColumn({ type: 'timestamp' })
        updatedAt: Date;
    }