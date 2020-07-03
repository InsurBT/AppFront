import listePrestations from '../data/prestation';

const presationService = {
    ajouterPrestations: function (prestations) {
        listePrestations.push(prestations);
    },
}

export default presationService;