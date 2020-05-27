const url = "http://localhost:4000/";

const api = {
    post: function (path, body = null, headers = null) {
        return fetch(url + path, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                ...headers
            }
        });
    },

    get: function (path, headers = null) {
        return fetch(url + path, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                ...headers
            }
        });
    }
};

export default api;