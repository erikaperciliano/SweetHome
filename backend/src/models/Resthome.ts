import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('resthome')
export default class Resthome {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    //não é colocado o @Columns pq não existe essa coluna no banco
    @OneToMany(() => Image, image => image.resthome,{
       cascade: ['insert', 'update'] 
    })


    @JoinColumn({ name: 'resthome_id' })
    images: Image[];
    
}