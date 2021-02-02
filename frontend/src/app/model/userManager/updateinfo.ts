export class UpdateInfo {
  id: number;
  name: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  avatar: string;

  constructor(name: string, username: string, address: string, email: string, phone: string, avatar: string) {
    this.name = name;
    this.username = username;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
  }
}
