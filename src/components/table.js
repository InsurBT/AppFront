import React, { useState, useEffect } from 'react';

import * as Styles from '../CSS/table.css';

// @matrial-ui components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

// @matrial-ui icons
import SearchIcon from "@material-ui/icons/Search";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Back from "@material-ui/icons/NavigateBefore";
import Next from "@material-ui/icons/NavigateNext";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import PersonIcon from '@material-ui/icons/Person';
import styles from "../assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyle = makeStyles(styles);

/*
** le Composant Table affiche les données d'un tableau d'objet dans une table
** le tableau d'objet est passé dans le prop 'data'
** le Composant Table prend un prop 'columns' qui est définit les collonnes de la table
** 'columns' est un tableau d'objets définis comme suivant:
** {
**    title: <title for the header>, // propriété qui le tiTableRowe à afficher dans l'element <th>
**    property: <property of the data object> // le nom de la propriété de l'objet à afficher qui est liée à ce tiTableRowe
** } 
** donc 'columns' est une sorte de map pour lié les collonnes de la table au propriétés des objets à afficher
*/

export default function CustomTable(props) {
    const classes = useStyle();

    // l'etat de l'index de la page actuelle
    const [currentPageIndx, setCurrentPageIndex] = useState(0);

    // l'etat des pages du tableau
    const [pages, setPages] = useState([[]]);

    // l'etat du numero de la page choisi par l'utilisateur
    const [selectedPage, setSelectedPage] = useState(1);

    // l'etat du filTableRowe enTableRowe dans le champ de recherche
    const [filter, setFilter] = useState("");

    // l'etat des donnees affichee
    const [displayedData, setDisplayedData] = useState(props.data);

    // l'etat de l'element du tableau selectione
    const [selectedElement, setSelectedElement] = useState({});

    // initialisation des pages a l'affichage et a chaque fois que les donnees a afficher sont modifiees
    useEffect(() => {
        const pageSize = parseInt(props.pageSize) || 10;
        const newPages = [];

        setCurrentPageIndex(0);
        setSelectedPage(1);
        
        if (displayedData.length === 0) {
            newPages.push([]);
        } else {
            for (var i = 0; i < displayedData.length; i += pageSize) {
                newPages.push(displayedData.slice(i, i + pageSize));
            }
        }

        setPages(newPages);
    }, [displayedData, props.pageSize]);

    // mis a jour des pages a chaque fois que props.data change
    useEffect(() => {
        setDisplayedData(props.data);
    }, [props.data]);

    // mise a jour des donnees affiche a chaque fois que le filTableRowe est modifie
    useEffect(() => {
        const newData = props.data.filter((element) => {
            let match = false;
            props.columns.forEach(column => {
                let stringValue = element[column.property].toString();
                match = match || (stringValue.toLowerCase().search(filter.toLowerCase()) !== -1);
            });
            return match;
        });

        setDisplayedData(newData);
    }, [filter]);

    function tableRows(size) {
        let rows = [];
        for (let i = 0; i < size; i++) {
            let element = pages[currentPageIndx][i];
            rows.push(<TableRow
                    className={classes.tableBodyRow}
                    key={i}
                    onClick={() => {
                        if (element) {
                            setSelectedElement(element);
                            if (props.onElementClick)
                                props.onElementClick(element);
                        }
                    }}
                    style={
                        element === selectedElement ?
                            {backgroundColor: "rgba(100,149,237,0.3)"} : {}
                    }
                >
                {
                    /*
                    ** si le prop 'buttons' est défini, 2 boutons de modification et suppression sont affichés
                    ** si leur methode respective 'edit' et 'delete' sont aussi defini comme props
                    ** ces props prennent comme valeur des fonctions qui seront appelé lors de l'appui sur les boutons
                    ** ces methodes prennent comme argument l'objet à modifier ou supprimer du tableau
                    */
                    props.buttons && element ? <TableCell className={classes.tableCell} key="table-buttons" >
                        {props.edit ? <IconButton onClick={() => {props.edit(element)}}><Edit /></IconButton> : ""}
                        {props.delete ? <IconButton onClick={() => { props.delete(element)}}><Delete /></IconButton> : ""}
                    </TableCell> : (element ? "" : <TableCell className={classes.tableCell} style={{ color: "white"}}>-</TableCell>)
                }
                {
                    props.columns.map((column, index) => {
                        return element ?
                                <TableCell className={classes.tableCell} key={"TableCell" + index} >
                                    {
                                        element[column.property]
                                    }
                                </TableCell> :
                                <TableCell className={classes.tableCell} style={{ color: "white"}}>-</TableCell>
                    })
                }
            </TableRow>);
        }

        return rows;
    }

    function actions() {
        if (typeof props.actions !== "undefined") {
            return (<FormControl style={{minWidth: "80px"}}>
                <InputLabel id="demo-simple-select-filled-label">Actions</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={props.action}
                    onChange={(e, child) => {props.handleAction(e.target.value, selectedElement)}}
                >
                    <MenuItem value=""></MenuItem>
                    {
                        props.actions.map((action) => {
                            return <MenuItem value={action}>{action}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>)
        } else {
            return "";
        }
    }

    function submitSelectedPage(e) {
        if (e.key === "Enter") {
            if (selectedPage > pages.length) {
                setCurrentPageIndex(pages.length - 1);
                setSelectedPage(pages.length);
            } else if (selectedPage < 1) {
                setCurrentPageIndex(0);
                setSelectedPage(1);
            } else {
                setCurrentPageIndex(selectedPage - 1);
            }
        }
    }

    function goNextPage() {
        if (selectedPage < pages.length) {
            setSelectedPage(selectedPage + 1);
            setCurrentPageIndex(currentPageIndx + 1);
        }
    }

    function goPreviousPage() {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
            setCurrentPageIndex(currentPageIndx - 1);
        }
    }

    return (<div className={classes.tableResponsive} style={{ borderRadius: "1%", backgroundColor: "white"}}>
        { props.searchBar ? <div style={{margin: "auto", maxWidth: "300px", display: "flex"}}>
            <TextField
                label="Recherche"
                value={filter}
                onChange={(e) => {setFilter(e.target.value)}}
                style={{padding: "0", margin:"0", width: "100%"}}
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
        </div> : null}
        <Table className={classes.table} >
            <TableHead className={classes.blueTableHeader}>
                <TableRow className={classes.tableHeadRow}>
                    {
                        props.buttons ? <th style={{...Styles.thStyle, minWidth: "80px"}}>
                            {actions()}
                        </th> : ""
                    }
                    {
                        props.columns.map((column, index) => <TableCell key={"th" + index} className={classes.tableCell + " " + classes.tableHeadCell}>{column.title}</TableCell>)
                    }
                </TableRow>
            </TableHead>
            
            <TableBody>
                    {
                        tableRows(props.pageSize || 10)
                    }
            </TableBody>
        </Table>
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
            <div style={{display: "flex", justifyContent: "space-around", width: "50%", maxWidth: "300px", alignSelf:"left"}}>
                <IconButton onClick={() => {setCurrentPageIndex(0); setSelectedPage(1);}}>
                    <FirstPage />
                </IconButton>
                <IconButton onClick={goPreviousPage}>
                    <Back />
                </IconButton>
                <Input
                    type="number"
                    style={{width: "50px"}}
                    align="center"
                    value={selectedPage}
                    onChange={(e) => {setSelectedPage(parseInt(e.target.value));}}
                    onKeyPress={submitSelectedPage}
                    inputProps={{min: 1, max: pages.length}}
                />
                <IconButton onClick={goNextPage}>
                    <Next />
                </IconButton>
                <IconButton onClick={() => {setCurrentPageIndex(pages.length -1); setSelectedPage(pages.length);}}>
                    <LastPage />
                </IconButton>
            </div>
            </div>
    </div>
    )
}