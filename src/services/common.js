export const base_url = "https://mongo-realm-worker.ericway1024.workers.dev";
// export const base_url = 'http://localhost:8787'
export const api_key = "B92PR3A2rwy5VQJgKjXxSffzDgjSZjthHghIXK1HGnZ6aYbUgGzdSX8jT4WS23M2";

const headers = {
    'authorization': `${api_key}`,
    'Content-Type': 'application/json'
}

export const request = async (url) => {
    try {
        const res = await fetch(`${base_url}${url}`, { headers })
            .then(res => res.json());
        return res;
    } catch (e) {
        console.error(e);
        return {};
    }
}