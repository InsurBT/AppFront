import assures from "./assures";

const assureSevice = {
    getAll: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    assures,
                    actions: [
                        "nouveau",
                        "consulter"
                    ]
                });
            }, 1500);
        });
    },

    getFiteredAssures: (filtre) => {
        return new Promise((resolve, reject) => {
            let filteredAssure = assures.filter((assure) => {
                let match = true;
                for (let attribute in assure) {
                    if (filtre[attribute])
                        match = match && (filtre[attribute] === assure[attribute]);
                }
                return match;
            })
            setTimeout(() => {
                resolve(filteredAssure);
            }, 1500);
        });
    },

    getAssureById: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(assures.find((assure) => assure.imme === id));
            }, 1500);
        });
    }
}

export default assureSevice;