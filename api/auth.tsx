import axiosInstance from "@/http/axiosInstance";

export function getRoles(): Promise<any> {
    return axiosInstance
        .get("/shared/roles")
        .then((res) => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}