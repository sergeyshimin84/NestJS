import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    } from 'typeorm';
    import { CategoriesEntity } from '../categories/categories.entity';
    import { UsersEntity } from '../users/esers.entity';
    import { CommentsEntity } from '../news/comments/comments.entity';
    import { ApiProperty } from '@nestjs/swagger/dist';
    
    @Entity('news')
    export class NewsEntity {
        @ApiProperty({
            example: 1,
            description: 'Индентиыикатор новости',
        })
        @PrimaryGeneratedColumn()
        id: number;

        @ApiProperty({
            example: 'Новости про котов',
            description: 'Заголовок новости',
        })
        @Column('text')
        title: string;

        @ApiProperty({
            example: 'Коты классные и милые...',
            description: 'Описание новости',
        })
        @Column('text')
        description: string;

        @ApiProperty({
            example: '',
            description: 'Обложка новости',
        })
        @Column('text', {nullable: true})
        cover: string;
        
        @OneToMany(() => CommentsEntity, (comments) => comments.news)
        comments: CommentsEntity;

        @ManyToOne(() => CategoriesEntity, (category) => category.news)
        category: CategoriesEntity;

        @ManyToOne(() => UsersEntity, (user) => user.news)
        user: UsersEntity;
        
        @CreateDateColumn({ type: 'timestamp' })
        createdAt: Date;
        
        @UpdateDateColumn({ type: 'timestamp' })
        updatedAt: Date;
    }
    