import React, { useState, useEffect } from 'react';

import * as Styles from '../CSS/table.css';
import IconButton from '../components/icon-button';
import TextInput from '../components/text-input';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

/*
** le Composant Table affiche les données d'un tableau d'objet dans une table
** le tableau d'objet est passé dans le prop 'data'
** le Composant Table prend un prop 'columns' qui est définit les collonnes de la table
** 'columns' est un tableau d'objets définis comme suivant:
** {
**    title: <title for the header>, // propriété qui le titre à afficher dans l'element <th>
**    property: <property of the data object> // le nom de la propriété de l'objet à afficher qui est liée à ce titre
** } 
** donc 'columns' est une sorte de map pour lié les collonnes de la table au propriétés des objets à afficher
*/

export default function Table(props) {

    // l'etat de l'index de la page actuelle
    const [currentPageIndx, setCurrentPageIndex] = useState(0);

    // l'etat des pages du tableau
    const [pages, setPages] = useState([[]]);

    // l'etat du numero de la page choisi par l'utilisateur
    const [selectedPage, setSelectedPage] = useState(1);

    // l'etat du filtre entre dans le champ de recherche
    const [filter, setFilter] = useState("");

    // l'etat des donnees affichee
    const [displayedData, setDisplayedData] = useState(props.data)

    // initialisation des pages a l'affichage et a chaque fois que les donnees a afficher sont modifiees
    useEffect(() => {
        const pageSize = parseInt(props.pageSize) || 10;
        const newPages = []
        
        if (displayedData.length === 0) {
            newPages.push([]);
        } else {
            for (var i = 0; i < displayedData.length; i += pageSize) {
                newPages.push(displayedData.slice(i, i + pageSize));
            }
        }

        setPages(newPages);
    }, [displayedData, props.pageSize]);

    // mise a jour des donnees affiche a chaque fois que le filtre est modifie
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
    }, [filter, props.data]);

    function tableRows(size) {
        let rows = [];
        for (let i = 0; i < size; i++) {
            let element = pages[currentPageIndx][i];
            rows.push(<tr key={"tr" + i}>
                {
                    /*
                    ** si le prop 'buttons' est défini, 2 boutons de modification et suppression sont affichés
                    ** quand cette proprieté est définie, il faut définir aussi les props 'edit' et 'delete'
                    ** ces props prennent comme valeur des fonctions qui seront appelé lors de l'appui sur les boutons
                    ** ces methodes prennent comme argument l'objet à modifier ou supprimer du tableau
                    */
                    props.buttons && element ? <td key="table-buttons" style={Styles.tdStyle}>
                        {props.edit ? <IconButton icon="edit" onClick={() => {props.edit(element)}} /> : ""}
                        {props.delete ? <IconButton icon="trash" onClick={() => { props.delete(element)}} /> : ""}
                    </td> : (element ? "" : <td style={{...Styles.tdStyle, color: "white"}}>-</td>)
                }
                {
                    props.columns.map((column, index) => {
                        return element ?
                                <td key={"td" + index} style={Styles.tdStyle}>{element[column.property].toString()}</td> :
                                <td style={{...Styles.tdStyle, color: "white"}}>-</td>
                    })
                }
            </tr>);
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
                    onChange={(e, child) => {props.handleAction(e.target.value)}}
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

    return (<div style={{backgroundColor: "white", width: "100%"}}>
        <div style={{margin: "auto", maxWidth: "300px"}}>
            <TextInput
                label="Recherche..."
                value={filter}
                icon="search"
                onChange={(e) => {setFilter(e.target.value)}}
            />
        </div>
        <div style={{...Styles.tableStyle, width: "100%", overflowX: "auto"}}>
            <thead style={Styles.theadStyle}>
                <tr>
                    {
                        props.buttons ? <th style={{...Styles.thStyle, minWidth: "80px"}}>
                            {actions()}
                        </th> : ""
                    }
                    {
                        props.columns.map((column, index) => <th key={"th" + index} style={Styles.thStyle}>{column.title}</th>)
                    }
                </tr>
            </thead>
            
            <tbody>
                    {
                        tableRows(props.pageSize || 10)
                    }
            </tbody>
        </div>
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
            <div style={{display: "flex", justifyContent: "space-around", width: "50%", alignSelf:"left"}}>
                <IconButton onClick={() => {setCurrentPageIndex(0); setSelectedPage(1);}} icon="angle-double-left" />
                <IconButton onClick={goPreviousPage} icon="angle-left" />
                <TextInput
                    type="number"
                    min="1"
                    max={pages.length}
                    icon="none"
                    style={{width: "50px", height: "25px", padding: "0", margin: "2px"}}
                    align="center"
                    value={selectedPage}
                    onChange={(e) => {setSelectedPage(parseInt(e.target.value));}}
                    onKeyPress={submitSelectedPage}
                />
                <IconButton onClick={goNextPage} icon="angle-right" />
                <IconButton onClick={() => {setCurrentPageIndex(pages.length -1); setSelectedPage(pages.length);}} icon="angle-double-right" />
            </div>
            </div>
    </div>
    )
}