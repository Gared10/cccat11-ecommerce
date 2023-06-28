import RepositoryFactory from "./interface/RepositoryFactory";
import { pbkdf2Sync, randomBytes } from 'crypto';
import UserRepository from "./interface/UserRepository";
import User from "../../domain/entity/User";

export default class SignUp {
  userRepository: UserRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(input: Input): Promise<void> {
    if (this.isValid(input.email)) {
      const salt = randomBytes(20).toString("hex");
      const password = pbkdf2Sync(input.password, salt, 64, 100, "sha512").toString("hex");
      const user = new User(input.email, password, salt);
      await this.userRepository.save(user);
    }
  }

  isValid(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );
  }
}

type Input = {
  email: string,
  password: string
}