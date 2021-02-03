export class SignupInfo {
  username: string;
  phone: string;
  password: string;
  password_confirmation: string;

  constructor(username: string, phone: string, password: string, password_confirmation: string) {
    this.username = username;
    this.phone = phone;
    this.password = password;
    this.password_confirmation = password_confirmation;
  }
}
