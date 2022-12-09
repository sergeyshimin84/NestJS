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
    
    @Entity('news')
    export class UsersEntity {
        @PrimaryGeneratedColumn()
        id: number;
        
        @Column('text')
        firstName: string;
        
        @OneToMany(() => NewsEntity, (news) => news.user)
        news: NewsEntity[];

        @CreateDateColumn({ type: 'timestamp' })
        createdAt: Date;
        
        @UpdateDateColumn({ type: 'timestamp' })
        updatedAt: Date;
    }