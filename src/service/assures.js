function randomDate() {
    let randomYear = Math.ceil(Math.random() * 40 + 1960);
    let randmomMonth = Math.ceil(Math.random() * 11 + 1);
    let randomDay = Math.ceil(Math.random() * 27 + 1);

    if (randmomMonth < 10) {
        randmomMonth = "0" + randmomMonth;
    }

    if (randomDay < 10) {
        randomDay = "0" + randomDay;
    }

    return randomYear + "-" + randmomMonth + "-" + randomDay;
}

const assures = [
    {
        imme: 13342,
        lienParente: "5666-2020-02-100",
        nom: "El Madani",
        prenom: "Mohammed",
        dateNaissance: randomDate(),
        formulaireDroit: "NM121",
        debutCouverture: "2020-02-25",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 12932,
        lienParente: "5666-2020-02-12",
        nom: "Rabii",
        prenom: "Hassan",
        dateNaissance: randomDate(),
        formulaireDroit: "NM123",
        debutCouverture: "2020-01-19",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 13342,
        lienParente: "5666-2020-04-100",
        nom: "El Bouhali",
        prenom: "Naima",
        dateNaissance: randomDate(),
        formulaireDroit: "NM116",
        debutCouverture: "2020-03-11",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 13232,
        lienParente: "5666-2020-02-100",
        nom: "Bellcaid",
        prenom: "Youssef",
        dateNaissance: randomDate(),
        formulaireDroit: "NM195",
        debutCouverture: "2020-09-30",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 12932,
        lienParente: "5666-2020-02-100",
        nom: "Benchekroune",
        prenom: "Kawtar",
        dateNaissance: randomDate(),
        formulaireDroit: "NM142",
        debutCouverture: "2019-12-29",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 13926,
        lienParente: "5666-2020-02-100",
        nom: "Hanafi",
        prenom: "Souhail",
        dateNaissance: randomDate(),
        formulaireDroit: "NM133",
        debutCouverture: "2020-10-05",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 13663,
        lienParente: "5666-2020-02-100",
        nom: "El Baz",
        prenom: "Adil",
        dateNaissance: randomDate(),
        formulaireDroit: "NM132",
        debutCouverture: "2020-05-05",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 12821,
        lienParente: "5666-2020-02-100",
        nom: "Wahabi",
        prenom: "Malak",
        dateNaissance: randomDate(),
        formulaireDroit: "NM184",
        debutCouverture: "2020-02-05",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 14144,
        lienParente: "5666-2020-02-100",
        nom: "Soufiani",
        prenom: "Hajar",
        dateNaissance: randomDate(),
        formulaireDroit: "NM154",
        debutCouverture: "2020-02-05",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 13366,
        lienParente: "5666-2020-02-100",
        nom: "El Attawi",
        prenom: "Ahmed",
        dateNaissance: randomDate(),
        formulaireDroit: "NM134",
        debutCouverture: "2020-02-05",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    },
    {
        imme: 13333,
        lienParente: "5666-2020-02-100",
        nom: "Radi",
        prenom: "Bouchaaib",
        dateNaissance: randomDate(),
        formulaireDroit: "NM145",
        debutCouverture: "2020-02-05",
        finCouverture: "2020-06-05",
        agence: "Maarif",
        ayantsDroit: "",
    }
];

export default assures;