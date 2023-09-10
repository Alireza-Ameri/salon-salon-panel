interface ISalon {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    owner_id: number,
    name: string;
    phone: string;
    address: string;
    description: string | null;
    image: string | null;
    video: string | null;
    map:string | null
  }
  
  export { ISalon };
