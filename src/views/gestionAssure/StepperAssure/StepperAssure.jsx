import React from 'react';
import SteppreAssurePrincipale from './StepperAssurePrincipale/StepperAssurePrincipale';
import ListeAssure from './AyantsDroit/listeAyantsDroit';
import ListeMondataire from './Mondataire/listeMondataire'    
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
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
   
  }));


function getSteps() {
return ['Assuré principale', 'Ayants droit', 'Mandataire'];
}  

function getStepContent(stepIndex) {
   
    switch (stepIndex) {
      case 0:
        return (
            <div >
              
                <SteppreAssurePrincipale/>
              
            </div>)
        
      case 1:
        return <ListeAssure/>
      case 2:
        return <ListeMondataire/>
      default:
        return 'Unknown stepIndex'
    }
  }

export default function StepperAssure() {
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
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>toutes les étapes sont terminées</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Retour
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
