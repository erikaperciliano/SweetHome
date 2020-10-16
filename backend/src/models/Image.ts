import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Resthome from './Resthome';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Resthome, resthome => resthome.images)
    @JoinColumn({name: 'resthome_id'})
    resthome: Resthome;
}