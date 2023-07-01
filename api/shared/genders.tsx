import axiosInstance from '@/http/axiosInstance';

export function getGenders(): Promise<any> {
    return axiosInstance
        .get("/shared/genders")
        .then((res) => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}