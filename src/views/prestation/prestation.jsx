import React, {useState} from 'react';
import FormPrestation from './formPrestation'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popup from 'reactjs-popup';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(action, prestation, cotation, nbrActes, mtEngage, mtAregle, remboursable, notifNonRem) {
    return { action, prestation, cotation, nbrActes, mtEngage, mtAregle, remboursable, notifNonRem };
  }

  const rows = [
    createData('', '','','','','','',''),
  ];
export default function Prestation() {
    const [open, setOpen] = useState(false);
      

    const classes = useStyles();

return (<div>
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                            
                            <TableCell align="right"> <Button variant="contained" color="primary"  onClick={() => setOpen(true) }> Nouveau</Button></TableCell>
                            <TableCell align="right">prestation</TableCell>
                            <TableCell align="right">cotation</TableCell>
                            <TableCell align="right">bbrActes</TableCell>
                            <TableCell align="right">mtEngage</TableCell>
                            <TableCell align="right">mtAregle</TableCell>
                            <TableCell align="right">remboursable</TableCell>
                            <TableCell align="right">notifNonRem</TableCell>
                           
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.action}</TableCell>
                                <TableCell align="right">{row.prestation}</TableCell>
                                <TableCell align="right">{row.cotation}</TableCell>
                                <TableCell align="right">{row.nbrActes}</TableCell>
                                <TableCell align="right">{row.mtEngage}</TableCell>
                                <TableCell align="right">{row.mtAregle}</TableCell>
                                <TableCell align="right">{row.remboursable}</TableCell>
                                <TableCell align="right">{row.notifNonRem}</TableCell>
                                
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Popup open={open}> <FormPrestation/> </Popup>
      </div>  
);
      
}
