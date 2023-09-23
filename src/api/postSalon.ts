import { customAxios } from "./api";

interface IData {
  name: string;
  phone: string;
  address: string;
  description: string | null;
  image: string | null;
  video: string | null;
  map: string | null;
  workingHours:string[];
  serviceIds:number[];
}

interface IResponse {}

const postSalon = (
  name: string,
  phone: string,
  address: string,
  description: string | null,
  image: string | null,
  video: string | null,
  map: string | null,
  workingHours:string[],
  serviceIds:number[],
) => {
  return customAxios.post<IData, any>("/salon/register-salon", {
    name,
    phone,
    address,
    description,
    image,
    video,
    map,
    serviceIds,
    workingHours
  });
};

export { postSalon };
