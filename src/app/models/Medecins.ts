import {Specialites} from './Specialites'
export class Medecins{
  idMedecin :string;
  nom :string;
  prenom :string;
  telephone :string;
  email :string;
  specialiteId :number;
  conventionCnam:boolean;
  specialiteMedicales:string;
	explorationFonctionelle:string;
	specialiteChirurgicales:string;
  specialites: Specialites ;
  creationDate:Date;
	disabled:boolean;

}