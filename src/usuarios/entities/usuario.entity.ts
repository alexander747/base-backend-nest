import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', { unique: true })
    usuario: string;

    @Column('text')
    password: string;

    @Column('bool', { default: true })
    activo: boolean;

    @Column('text', { default: 'NO_ESPECIFICA' })
    tipoIdentificacion: string;

    @Column('text', { unique: true })
    identificacion: string;

    @Column('text', { unique: false })
    nombres: string;

    @Column('text', { unique: false, default: 'NO_ESPECIFICADO' })
    apellidoUno: string;

    @Column('text', { unique: false, default: 'NO_ESPECIFICADO' })
    apellidoDos: string;

    @Column('text', { unique: false, nullable: true })
    correo: string;

    @Column('text', { unique: false, nullable: true })
    telefono: string;

    @Column('text', { unique: false, nullable: true })
    direccion: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
