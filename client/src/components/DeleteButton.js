import React from 'react';
import { GET_CONTINENTS, GET_COUNTRIES, DELETE_COTINENT_MUTATION, DELETE_COUNTRY_MUTATION } from '../util/graphql'
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
import { makeStyles } from '@material-ui/core/styles';

// small window to show confirmation massage before delteing the data
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

// button style
const useStyles = makeStyles({
    flexGrow: {
        flex: '1',
    },
    button: {
        backgroundColor: '#21ABAB',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#21ABAB',
        },
    }
})


// button to delete country or continent in the admin page  
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
                callBack() //callBack =>  refresh page after deleting the country  
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

    const classes = useStyles()

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
                    <Button  className={classes.button} autoFocus onClick={handleClose} size='small'>
                        Cancel
                    </Button>
                    <Button className={classes.button} size='small' onClick={
                        () => {
                            selectedCountryId ? deleteCountry() : deleteContinent()
                        }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteButton;

