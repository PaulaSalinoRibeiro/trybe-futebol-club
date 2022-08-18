export type LoginData = {
  email: string;
  password: string;
};

export default interface Login {
  login(data: LoginData): Promise<string | void>;
}
