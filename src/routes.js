import Home from './views/home';
import ListePrestations from './views/GestionReferentiel/GestionPrestation/liste-prestations';
import ListeUtilisateurs from './views/list-utlisateurs';
import DirectionReg  from './views/GestionReferentiel/listeDirectionReg';
import ListeCaisseEtrangeres from './views/GestionReferentiel/caisseEtrangere/caisseEtrangere';
import ListeAssure from './views/GestionAssure/listeAssure';
import ListeCaisseMeres from './views/GestionReferentiel/caisseMere/caisseMere';
import DossiersRouter from './routers/dossiers/dossiers-router';
import AssureRouter from './routers/assure/assuré-router';

import Paremetrage from './routers/parametrage/parametrage';
import Referentiel from './routers/referentiel/referentiel';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Unarchive from "@material-ui/icons/Unarchive";
import Settings from "@material-ui/icons/SettingsApplications";
import Language from '@material-ui/icons/Language';



const routes = [
    {
        name: "Accueil",
        path: "/accueil",
        component: Home,
        icon: Dashboard,
        layout: "/home",
        roles: ["Admin", "Agent"]
    },

    {
        name: "Paramétrage",
        path: "/parametrage",
        component: Paremetrage,
        icon: Settings,
        layout: "/home",
        subRoutes: [
            {
                name: "Gestion des utilisateurs",
                path: "/utilisateurs",
                component: ListeUtilisateurs
            }
        ],
        roles: ["Admin"]
    },

    {
        name: "Référentiel",
        path: "/referentiel",
        component: Referentiel,
        icon: Language,
        layout: "/home",
        subRoutes: [
            {
                name: "Directions regionales",
                path: "/direction_regionale",
                component: DirectionReg
            },
            {
                name: "Liste des prestations",
                path: "/prestations",
                component: ListePrestations
            },
            {
                name: "Caisses meres",
                path: "/caisses_meres",
                component: ListeCaisseMeres
            },
            {
                name: "Caisses etrangere",
                path: "/caisses_etrangeres",
                component: ListeCaisseEtrangeres
            }
        ],
        roles: ["Admin"]
    }, 

    {
        name: "Gestion des dossiers",
        path: "/dossiers",
        component: DossiersRouter,
        icon: LibraryBooks,
        layout: "/home",
        subRoutes: [],
        roles: ["Admin", "Agent"]
    },
    {
        name:"Gestion des assurés",
        path: "/gestionAssure",
        component: AssureRouter,
        icon: LibraryBooks,
        layout:"/home",
        roles: ["Agent"]
    }
];

export default routes;