import { api } from "./api";

export async function getEventos() {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.get("/eventos", {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function deleteEvento(id) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.delete(`/evento/${id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
    });
    return result;
}

export async function updateEvento(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.put(
        `/evento/${data.id}`,
        {
            nome: data.nomeEvento,
            data: data.dataEvento,
            adendo: data.adendoEvento,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}

export async function createEvento(data) {
    const accessToken = sessionStorage.getItem("token");
    const result = await api.post(
        "/evento",
        {
            nome: data.nomeEvento,
            data: data.dataEvento,
            adendo: data.adendoEvento,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
        }
    );
    return result;
}
