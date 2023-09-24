interface IService {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  description: string;
  image: string;
}

interface ISalon {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  owner_id: number;
  name: string;
  phone: string;
  address: string;
  description: string | null;
  image: string | null;
  video: string | null;
  map: string;
  workingHours: any[];
  services: IService[];
}

export { ISalon, IService };
