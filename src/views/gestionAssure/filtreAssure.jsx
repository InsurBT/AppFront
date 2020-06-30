import React , {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core/';

const TabdrRegional = ['Tanger-Tetouan-Al Hoceima', 'Oriental',
    'Fès-Meknès', 'Rabat-Salé-Kénitra',
    'Casablanca-Settat', 'Marrakesh-Safi'
]
const TabAGENCEMa = ['tanger', 'tetouan',
    'fes', 'mekness', 'Rabat', 'Sale', 'Casablanca'
]
const TabConvention = ['Convention1', 'Convention2', 'Convention3', 'Convention4', 'Convention4']
const TabModePaiement = ['Mode paiement1', 'Mode paiement2', 'Mode paiement3', 'Mode paiement4', 'Mode paiement5']
const TabFormulaire = ['Formulaire1', 'Formulaire2', 'Formulaire3', 'Formulaire4', 'Formulaire5']
const FiltreAssure = () => {

    const [filtre , setfiltre] = useState({
        immatriculation : '',
        dateInscription : '2020-01-01',
        principalInsured : {
            Nom : '',
            Prenom : ''
        },
        ayantDroit : {
            Nom : '',
            Prenom : ''
        },
        agence : {
            DrRegional : '',
            Agence : ''
        },
        ConvenForm : {
            convention : '',
            modePaiement : '',
            formulaire : ''
        },
        dateDebut:'2020-01-01',
        dateFin : '2020-01-01'
    })

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        label: {
            color: 'dodgerblue',
            fontSize: '18px',
            fontStyle: 'oblique'
        },
        button: {
            color: 'dodgerblue',
        }
    }));
    const classes = useStyles();
    const { ConvenForm, agence } = filtre
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div className="form-groum" style={{ display: 'initial' }}>
                    <TextField color='primary' margin='normal'
                        label="Num Immatriculation"
                        value={filtre.immatriculation}
                        onChange={(e) => setfiltre({ ...filtre, immatriculation: e.target.value })}
                    />
                    <TextField
                        color='primary'
                        label="Date d'inscription"
                        type="date"
                        value={filtre.dateInscription}
                        onChange={(e) => setfiltre({ ...filtre, dateInscription: e.target.value })}
                    />
                </div>
                <div className="form-groum" style={{ display: 'initial' }}>
                    <InputLabel className={classes.label} shrink>Asuure Principale</InputLabel>
                    <TextField required label="Nom"
                        value={filtre.principalInsured.Nom}
                        onChange={(e) => setfiltre({ ...filtre, principalInsured: { ...filtre.principalInsured, Nom: e.target.value } })}
                    />
                    <TextField
                        label="Prenom"
                        value={filtre.principalInsured.Prenom}
                        onChange={(e) => setfiltre({ ...filtre, principalInsured: { ...filtre.principalInsured, Prenom: e.target.value } })}
                    />
                </div>
                <div className="form-groum" style={{ display: 'initial' }}>
                    <InputLabel className={classes.label} shrink>Ayant Droit</InputLabel>
                    <TextField
                        label="Nom"
                        value={filtre.ayantDroit.Nom}
                        onChange={(e) => setfiltre({ ...filtre, ayantDroit: { ...filtre.ayantDroit, Nom: e.target.value } })}
                    />
                    <TextField
                        label="Prenom"
                        value={filtre.ayantDroit.Prenom}
                        onChange={(e) => setfiltre({ ...filtre, ayantDroit: { ...filtre.ayantDroit, Prenom: e.target.value } })}
                    />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div className="form-groum" style={{ display: 'table-cell', marginRight: '12px', marginTop: '20px' }}>
                    <InputLabel className={classes.label} shrink>Agence</InputLabel>
                    <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={agence.DrRegional}
                        onChange={(e) => setfiltre({ ...filtre, agence: { ...filtre.agence, DrRegional: e.target.value } })}
                    >
                        <MenuItem value="" disabled>
                            DR Regional
                        </MenuItem>
                        {TabdrRegional.map((elem, index) => <MenuItem key={index} value={elem} >{elem}</MenuItem>)}
                    </Select>
                    <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={agence.Agence}
                        onChange={(e) => setfiltre({ ...filtre, agence: { ...filtre.agence, Agence: e.target.value } })}
                    >
                        <MenuItem value="" disabled>
                            AGENCE
                        </MenuItem>
                        {TabAGENCEMa.map((elem, index) => <MenuItem key={index} value={elem} >{elem}</MenuItem>)}
                    </Select>
                </div>
                <div className="form-groum" style={{ display: 'initial', marginLeft: "20px", marginTop: '20px' }}>
                    <InputLabel className={classes.label} shrink>Convention-Formulaire</InputLabel>
                    <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={ConvenForm.convention}
                        onChange={(e) => setfiltre({ ...filtre, ConvenForm: { ...filtre.ConvenForm, convention: e.target.value } })}
                    >
                        <MenuItem value="" disabled>
                            Convention
                        </MenuItem>
                        {TabConvention.map((elem, index) => <MenuItem key={index} value={elem} >{elem}</MenuItem>)}
                    </Select>
                    <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={ConvenForm.modePaiement}
                        onChange={(e) => setfiltre({ ...filtre, ConvenForm: { ...filtre.ConvenForm, modePaiement: e.target.value } })}
                    >
                        <MenuItem value="" disabled>
                            Mode de Paiement
                        </MenuItem>
                        {TabModePaiement.map((elem, index) => <MenuItem key={index} value={elem} >{elem}</MenuItem>)}
                    </Select>
                    <Select
                        displayEmpty
                        value={ConvenForm.formulaire}
                        onChange={(e) => setfiltre({ ...filtre, ConvenForm: { ...filtre.ConvenForm, formulaire: e.target.value } })}
                    >
                        <MenuItem value="" disabled>
                            Formulaire
                        </MenuItem>
                        {TabFormulaire.map((elem, index) => <MenuItem key={index} value={elem} >{elem}</MenuItem>)}
                    </Select>
                </div>
            </div>
            <div style={{ marginTop: '25px' }} >
                <TextField
                    color='primary'
                    label="Date Debut"
                    type="date"
                    value={filtre.dateDebut}
                    onChange={(e) => setfiltre({ ...filtre, dateDebut: e.target.value })}
                />
                <TextField
                    color='primary'
                    label="Date Fin"
                    type="date"
                    value={filtre.dateFin}
                    onChange={(e) => setfiltre({ ...filtre, dateFin: e.target.value })}
                />
                <div style={{ float: 'right', margin: '0 145px' }} >
                    <Button className={classes.button} onClick={e => {console.log(filtre) }}>
                        Filtrer
                    </Button>
                </div>
            </div>
        </>
    )
}

export default FiltreAssure;