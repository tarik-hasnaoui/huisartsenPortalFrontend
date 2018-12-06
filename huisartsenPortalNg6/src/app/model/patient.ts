export class Patient {

  id:number;
  bsnNumber:string;
  lastName:string;
  firstName:string;


  constructor(id: number, bsnNumber: string, lastName: string, firstName: string) {
    this.id = id;
    this.bsnNumber = bsnNumber;
    this.lastName = lastName;
    this.firstName = firstName;
  }
}
