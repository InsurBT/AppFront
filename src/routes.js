import Home from './views/home';
import ListePrestations from './views/referentiel/liste-prestations';
import ListeUtilisateurs from './views/list-utlisateurs';
import DirectionReg  from './views/referentiel/listeDirectionReg';
import ListeCaisseEtrangeres from './views/caisseEtrangere/caisseEtrangere';
import ListeCaisseMeres from './views/caisseMere/caisseMere';


import DossiersRouter from './routers/dossiers/dossiers-router'

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import ViewListIcon from '@material-ui/icons/ViewList';
import Language from "@material-ui/icons/Language";

const routes = [
    {
        name: "Accueil",
        path: "/accueil",
        component: Home,
        icon: Dashboard,
        layout: "/home"
    },
    {
        name: "Listes des prestations",
        path: "/prestations",
        component: ListePrestations,
        icon: Unarchive,
        layout: "/home"
    },
    {
        name: "Listes des utilisateurs",
        path: "/utilisateurs",
        component: ListeUtilisateurs,
        icon: Person,
        layout: "/home"
    },
    {
        name: "Listes des dossiers de soins",
        path: "/dossiers",
        param: "category",
        component: DossiersRouter,
        icon: LibraryBooks,
        layout: "/home",
        subMenu: []
    },
    
    {
        name: "Listes des directions regionales",
        path: "/directionRegionle",
        component: DirectionReg,
        icon: LibraryBooks,
        layout: "/home"
    },
    {
        name: "Listes des caisses mére",
        path: "/caissemere",
        component: ListeCaisseMeres,
        icon: LibraryBooks,
        layout: "/home"
    },
    {
        name: "Listes des caisses étrangere",
        path: "/caisseetrangere",
        component: ListeCaisseEtrangeres,
        icon: LibraryBooks,
        layout: "/home"
    }
];

export default routes;