import React, {useEffect} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {DATA_VIEW_MODE} from "../constants";
import {ToggleDataViewMode} from "./ToggleDataViewMode";


import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import {useContacts} from "./useContacts";
import Typography from "@material-ui/core/Typography";
import {ContactsTable} from "./ContactsTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";
import {useDataViewMode} from "./useDataViewMode";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        headContainer: {
            marginBottom: theme.spacing(3),
        }
    }))


export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    useEffect(() => {
        localStorage.setItem("dataViewMode", dataViewMode);
    },[dataViewMode]);

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.headContainer}>
                    <Box display="flex" justifyContent={"space-between"} >
                        <Typography variant="h4" component="h1">
                            Contacts
                        </Typography>

                        <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode} />

                    </Box>

                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <CircularProgress />
                        }

                        if (contacts.isError) {
                            return <h2>error</h2>
                        }
                        if (dataViewMode === DATA_VIEW_MODE.TABLE) {
                            return <ContactsTable data={contacts.data}/>
                        }
                        if (dataViewMode === DATA_VIEW_MODE.GRID) {
                            return "grid"
                        }

                    })()}
                </Grid>
            </Grid>
        </Container>
    );
};
