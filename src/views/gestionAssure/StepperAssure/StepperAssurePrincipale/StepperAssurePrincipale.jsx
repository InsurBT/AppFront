import React  from 'react';
import FormIdentification from './formIdentification';
import FormAyantDroit from './formAyantsDroit';
import FormCoordonneesMaroc from './formCoordonneesMaroc';
import FormCoordonneesEtranger from './formCoordonnesEtranger';
import FormPaiement from './formPaiement';
import FormOuvertureDroit from './formOuvertureDriot';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
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
  return ['Identification', 'Ayants Droits', 'Coordonnée au Maroc', `Coordonnées à l'étranger`, 'Paiement','Ouverture de droit'];
}
function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormIdentification/>
      case 1:
        return <FormAyantDroit/>
      case 2:
        return <FormCoordonneesMaroc/>
      case 3:
        return <FormCoordonneesEtranger/>
      case 4:
        return <FormPaiement/>
      case 5:
        return <FormOuvertureDroit/>
      default:
        return 'Unknown step';
    }
  }

 const  StepperAssurePrincipale =(props)=> {

    const { classes } = props
    //const classes = useStyles();
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
        <Stepper 
            classes={{
              root: classes.root
            }}
            activeStep={activeStep} orientation="vertical" >
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
                      className={classes.buttonRetour}
                      disabled={activeStep === 0}
                      onClick={handleBack}
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
            
            <Button onClick={handleReset} className={classes.button}>
              Recommencer
            </Button>
          </Paper>
        )}
      </div>
    );
    
}

export default withStyles(styles)(StepperAssurePrincipale)
