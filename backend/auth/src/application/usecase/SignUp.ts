import RepositoryFactory from "./interface/RepositoryFactory";
import UserRepository from "./interface/UserRepository";
import User from "../../domain/entity/User";

export default class SignUp {
  userRepository: UserRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(input: Input): Promise<void> {
    const user = User.create(input.email, input.password);
    await this.userRepository.save(user);
  }


}

type Input = {
  email: string,
  password: string
}