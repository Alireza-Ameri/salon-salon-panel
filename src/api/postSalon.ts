import { customAxios } from "./api";

interface IData {
  name: string;
  phone: string;
  address: string;
  description: string | null;
  image: string | null;
  video: string | null;
  map: string | null;
}

interface IResponse {}

const postSalon = (
  name: string,
  phone: string,
  address: string,
  description: string | null,
  image: string | null,
  video: string | null,
  map: string | null
) => {
  return customAxios.post<IData, any>("/salon/register-salon", {
    name,
    phone,
    address,
    description,
    image,
    video,
    map,
  });
};

export { postSalon };
