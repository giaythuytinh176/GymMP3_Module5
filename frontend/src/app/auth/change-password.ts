export class ChangePassword {
  username: string;
  password: string;
  new_password: string;
  confirm_new_password: string;

  constructor(password: string, new_password: string, confirm_new_password: string) {
    this.password = password;
    this.new_password = new_password;
    this.confirm_new_password = confirm_new_password;
  }
}
