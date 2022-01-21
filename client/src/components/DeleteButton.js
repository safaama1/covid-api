import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}


function DeleteButton({ selectedCountryId, selectedContinentId, callBack }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [deleteCountry] = useMutation(DELETE_COUNTRY_MUTATION, {
        variables: { countryId: selectedCountryId },
        update(proxy) {
            if (selectedCountryId) {
                const data = proxy.readQuery({
                    query: GET_COUNTRIES
                });
                data.getCountries = data.getCountries.filter(country => country.id !== selectedCountryId)
                proxy.writeQuery({
                    query: GET_COUNTRIES,
                    data
                })
            }
            if (callBack) {
                callBack()
            }
        },
        onError(err) {
            console.log(err)
        }
    })

    const [deleteContinent] = useMutation(DELETE_COTINENT_MUTATION, {
        variables: { continentId: selectedContinentId },
        update(proxy) {
            if (selectedContinentId) {
                const data = proxy.readQuery({
                    query: GET_CONTINENTS
                });
                data.getContinents = data.getContinents.filter(continent => continent.id !== selectedContinentId)
                proxy.writeQuery({
                    query: GET_CONTINENTS,
                    data
                })
            }
            if (callBack) {
                callBack()
            }
        },
        onError(err) {
            console.log(err)
        }
    })

    return (
        <>
            <Tooltip title="Delete">

                <IconButton onClick={handleClickOpen} >
                    <DeleteIcon style={{ color: "red" }} />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure that you want to delete this data ?  
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={
                        () => {
                            selectedCountryId ? deleteCountry() : deleteContinent()
                        }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const DELETE_COUNTRY_MUTATION = gql`
            mutation($countryId: ID!) {
                deleteCountry(countryID: $countryId)
    }
            `
const DELETE_COTINENT_MUTATION = gql`
            mutation($continentId: ID!) {
                deleteContinent(continentID: $continentId)
    }
            `

const GET_COUNTRIES = gql`
            query getCountries{
                getCountries {
                id
            name
            cases
            todayCases
            todayDeaths
            deaths
            population
            continent
            active
            recovered
            todayRecovered
        }
    }
            `;
const GET_CONTINENTS = gql`
            query getContinents{
                getContinents {
                id
            name
            cases
            todayCases
            todayDeaths
            deaths
            population
            active
            recovered
            todayRecovered
        }
    }
            `;

export default DeleteButton;

