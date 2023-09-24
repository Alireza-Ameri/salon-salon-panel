import { customAxios } from "./api";
import { IService } from "../types/salon";

interface IResponse {
  data: {
    count: number;
    services: IService[];
  };
}

const getServices = () => {
  return customAxios.get<never, IResponse>("/service/get-all-services");
};

export { getServices };
