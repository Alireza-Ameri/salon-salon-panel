import { customAxios } from "./api";
import { IUser } from "../types/user";

interface IData {
  email: string;
  username:string;
  password: string;
}

interface IResponse {
    data: { token: string; user: IUser };
}

const postSalonRegister = (
  email: string,
  username: string,
  password: string
) => {
  return customAxios.post<IData, IResponse>("/auth/register/salon" , {
    email,
    username,
    password
  });
};

export { postSalonRegister };
