import { Artefacto } from "./artefacto";

export class Usuario {

    codigo: string;
	direccion: string;
	estado: string;
	nombre: string;
	apellido: string;
	usuaId: number;
	tiusId_TipoUsuario: number;
	artefactosList: string;
	artefactoDTOs: Artefacto[];
	pss: string;

}