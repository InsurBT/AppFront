import React from 'react';
import FormIdentification from './formIdentification';
import FormAyantDroit from './formAyantsDroit';
import FormCoordonneesMaroc from './formCoordonneesMaroc';
import FormCoordonneesEtranger from './formCoordonnesEtranger';
import FormPaiement from './formPaiement';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  return ['Identification', 'Ayants Droits', 'Coordonnée au Maroc', `Coordonnées à l'étranger`, 'Paiement','Ouverture de droit'];
}
function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormIdentification/>;
      case 1:
        return <FormAyantDroit/>;
      case 2:
        return <FormCoordonneesMaroc/>;
      case 3:
        return <FormCoordonneesEtranger/>;
      case 4:
        return <FormPaiement/>;
      case 5:
        return `.`;
      case 6:
        return `.`;
      default:
        return 'Unknown step';
    }
  }

export default function StepperAssurePrincipale() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  
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
            <Step key={label}>
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
            
            <Button onClick={handleReset} className={classes.button}>
            Recommencer
            </Button>
          </Paper>
        )}
      </div>
    );
}
