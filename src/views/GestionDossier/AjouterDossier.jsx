import React from 'react';
import FormInfoAssure from './formInfoAssure';
import FormDossier from './formDossier';
import FormValoraisation from './formValoraisation';
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Prestation from '../GestionReferentiel/GestionPrestation/prestation'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import assureService from '../../service/assure-service';

const styles = theme => ({
  root: {
    width: '100%',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  step: {
    "& $completed": {
      color: "#1a8cff"
    },
    "& $active": {
      color: "#b3d9ff"
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
        return ['Info assure', 'Dossier', 'Prestation','Valoraisation'];
      }


const VerticalLinearStepper= (props) => {
  const {classes} = props;

  // id de l'assure passé en paramètre dand l'url
  const { idAssure } = useParams();

  // etat de l'etape actuelle
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();

  // etat de l'assure
  const [assure, setAssure] = useState({
    imme: 0,
    nom: "",
    prenom: "",
    dateCouverture: "",
    dateFinCouverture: "",
    dateNaissance: "",
    formulaireOuvertureDroit: "",
    consomation: "",
    dateSortie: "",
    consomationFamiliale: "",
    lien: ""
  });

  // chargement des informations de l'assuré
  useEffect(() => {
    console.log(idAssure);
    assureService.getAssureById(parseInt(idAssure)).then((res) => {
      if (res) {
        setAssure(res);
      }
    })
  }, [])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return  <FormInfoAssure assure={assure} setAssure={setAssure}/> ;
      case 1:
        return <FormDossier/>;
      case 2:
        return <Prestation/>;
      case 3:
        return <FormValoraisation/>;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
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
          activeStep={activeStep} 
          orientation="vertical">
        {steps.map((label, index) => (
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
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.buttonRetour}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Recommencer
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default withStyles(styles)(VerticalLinearStepper)