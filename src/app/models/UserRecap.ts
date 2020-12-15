// model used in Users component to generate users list
export class UserRecap {
    id: number;
    address: string;
    wallet: number;
    postalCode: string;
    registrationDate: string;
    email: string;
    isLunchLady: boolean;
    name: string;
    firstname: string;
    phone: string;
    town: string;
    sex: number;
    status: number;
    imageId: number;

    constructor (usersResponse: any) {
      this.id = usersResponse.id;
      this.address = usersResponse.address;
      this.wallet = usersResponse.wallet;
      this.postalCode = usersResponse.postalCode;
      this.registrationDate = usersResponse.registrationDate;
      this.email = usersResponse.email;
      this.isLunchLady = usersResponse.isLunchLady;
      this.name = usersResponse.name;
      this.firstname = usersResponse.firstname;
      this.phone = usersResponse.phone;
      this.town = usersResponse.town;
      this.sex = usersResponse.sex;
      this.status = usersResponse.status;
      this.imageId = usersResponse.imageId;
    }
  }


  
