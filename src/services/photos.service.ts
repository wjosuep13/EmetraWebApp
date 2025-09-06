import api from "../api/api";

export interface Photo {
  id: string;
  photo_path: string;
  photo_date: string;
  id_photo_status: number;
}
export type Vehicle = {
  type: string,
  brand: string,
  color: string,
  plate: string
}


export type PhotoDetail = {
  id: number,
  photo_path: string,
  date: string,
  time: string,
  vehicle: Vehicle,
  distance: string,
  fileName: string,
  location: string,
  speedLimit: string,
  videoNumber: number,
  serialNumber: number,
  measuredSpeed: string
}

export const PhotosService = {
  getAll: async (cruise_id: number, date: string, page: number): Promise<Photo[]> => {
    const params = `photo_date=${date}&id_cruise=${cruise_id}&page=${page}&limit=10`;
    const { data } = await api.get(`/photos?${params}`);

    return data[0];
  },

  updateStatus: async (id: string, status: string) => {
    const { data } = await api.patch(`/photos/${id}`, { status });
    return data;
  },

  blockPhoto: async (id: string) => {
    const { data } = await api.patch(`/photos/${id}/take`);
    return data;
  },
  getById: async (id: string): Promise<PhotoDetail> => {
    const { data } = await api.get(`/photos/${id}`);
    console.log(data);
    return { id: data.id, photo_path: data.photo_path, ...data.photo_info }
  },
};
