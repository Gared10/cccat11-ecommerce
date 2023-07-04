export default class Email {
  value: string;

  constructor(readonly email: string) {
    if (!this.isValid(email)) throw new Error("Invalid email");
    this.value = email;
  }

  isValid(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );
  }
}