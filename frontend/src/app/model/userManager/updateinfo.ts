export class UpdateInfo {
  id: number;
  name: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  avatar: string;

  constructor(
    id: number,
    name: string,
    username: string,
    address: string,
    email: string,
    phone: string,
    avatar: string
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
  }
}
