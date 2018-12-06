import {Prescription} from "./prescription";

export class Medication {

  id: number;
  name: string;
  prescription: Prescription[];


  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
