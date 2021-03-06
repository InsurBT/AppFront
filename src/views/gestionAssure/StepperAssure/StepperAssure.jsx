import React from 'react';
import SteppreAssurePrincipale from './StepperAssurePrincipale/StepperAssurePrincipale';
import ListeAssure from './AyantsDroit/listeAyantsDroit';
import AyantDroits from '../formulaire/AyantDroit';
import ListeMondataire from './Mondataire/listeMondataire'    
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useState } from 'react';
import Mandataire from '../formulaire/Mandataire';

import assureService from '../../../service/assure-service';

  const styles = theme => ({
    root: {
     
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    labelContainer: {
      "& $alternativeLabel": {
        marginTop: 0
      }
    },
    step: {
      "& $completed": {
        color: "#33cccc"
      },
      "& $active": {
        color: "#d6f5f5"
      },
      "& $disabled": {
        color: "#ccffff"
      }
    },
    alternativeLabel: {},
    active: {}, //needed so that the &$active tag works
    completed: {},
    disabled: {},
    labelContainer: {
      "& $alternativeLabel": {
        marginTop: 0
      }
    },
    button : {
      backgroundColor : '#b3d9ff',
      '&:hover' : {
        backgroundColor : "#1a8cff"
      }
    },
    buttonRetour : {
      backgroundColor : '#e6f2ff'
    }
  });
  

function getSteps() {
return ['Assuré principale', 'Ayants droit', 'Mandataire'];
}  
const StepperAssure= (props)=> {
  
  const {classes} = props;
  const today = todaysDate();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [ayantDroits,setAyantDroits]=useState([]);
  const [mandataires,setMandataires]=useState([]);

  const[formAssure,setFormAssure]=useState({
    ImmCNSS: "",
    adresse : "",
    codPostal : "",
    ville:"",
    id:"",
    tel:"",
    agence :"",
    idAgence :"",
    email:"",
    mobile:"",
    sitFamiliale :"",
    nbrConjoint : 0,
    nbrEnfant : 0,
    nbrayantDroit :"",
    nom:"",
    jeunefille :"",
    prenom:"",
    age:"",
    CIN:"",
    passeport:"",
    sexe:"",
    nationnalite:"",
    dateNaissance:today,
    pays:"",
    idpays:"",
    ImmCE:"",
    ImmCETierce:"",
    ville:"",
    id:"",
    adresse:"",
    codPostal:"",
    caisse:"",
    idCaisse:"",
    mobile:"",
    caisseMere:"",
    idCaisseMere:"",
    tel:"",
    modeRemboursement:"",
    RIB:"",
    formulaire:"",
    designation:"",
    dateReception:today,
    debutCouverture:today,
    finCouverture:today
    
  });


  function todaysDate() {
    const today = new Date();

    let day = ("0" + today.getDate()).slice(-2);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();

    return [year, month, day].join('-');
   }
  

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
      <div>
            <SteppreAssurePrincipale formAssure={formAssure} setFormAssure={setFormAssure}/>
      </div>)
    case 1:
      return <AyantDroits ayantDroits={ayantDroits} setAyantDroits={setAyantDroits}  classes={classes}/>
    case 2:
      return <Mandataire mandataires={mandataires} setMandataires={setMandataires}/>
    default:
      return 'Unknown stepIndex'
  }
}


    const handleNext = () => {
      if (activeStep === steps.length - 1) {
        assureService.ajouterAssure(formAssure);
        console.log(formAssure)
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    return (
      <div className={classes.root}>
        <Stepper 
            classes={{
              root: classes.root
            }}
            activeStep={activeStep} alternativeLabel
            >
          {steps.map((label) => (
            <Step 
                key={label}
                classes={{
                  root: classes.step,
                  completed: classes.completed,
                  active: classes.active,
                  disabled : classes.disabled
                }}
                >
              <StepLabel
                  classes={{
                    alternativeLabel: classes.alternativeLabel,
                    labelContainer: classes.labelContainer
                  }}
                  StepIconProps={{
                    classes: {
                      root: classes.step,
                      completed: classes.completed,
                      active: classes.active,
                      disabled: classes.disabled
                    }
                  }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>L'assuré a été ajouté avec succès </Typography>
              <Link color="inherit" href="http://localhost:3000/home/gestionAssure">
                  <Button className={classes.buttonRetour}>Terminer</Button>
              </Link>
             
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  className={classes.buttonRetour}
                  onClick={handleBack}
                >
                  Retour
                </Button>
                <Button variant="contained" className={classes.button} onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default withStyles(styles)(StepperAssure);