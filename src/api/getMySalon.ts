import { customAxios } from "./api";
import { ISalon } from "../types/salon";

interface IResponse {
  data:ISalon 
}

const getMySalon = () => {
  return customAxios.get<never, IResponse>("/salon/mine");
};

export { getMySalon };
