import axiosInstance from '@/http/axiosInstance';

export function getLanguages(): Promise<any> {
    return axiosInstance
        .get("/shared/languages")
        .then((res) => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}