import React from 'react';
import FormInfoAssure from './formInfoAssure';
import FormDossier from './formDossier';
import FormValoraisation from './formValoraisation';
import { makeStyles } from '@material-ui/core/styles';
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


const useStyles = makeStyles((theme) => ({
  root: {
        width: '100%',
      },
      button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      actionsContainer: {
        marginBottom: theme.spacing(2),
      },
      resetContainer: {
        padding: theme.spacing(3),
      },
}));

function getSteps() {
        return ['Info assure', 'Dossier', 'Prestation','Valoraisation'];
      }


export default function VerticalLinearStepper() {
  const classes = useStyles();

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
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
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