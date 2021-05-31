import React, {useEffect, useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {DATA_VIEW_MODE} from "../constants";
import {ToggleDataViewMode} from "./ToggleDataViewMode";
import {useDataViewMode} from "./useDataViewMode";
import {ContactsFilters} from "./ContactsFilters";


import {useContacts} from "./useContacts";
import {ContactsTable} from "./ContactsTable";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        headContainer: {
            marginBottom: theme.spacing(3),
        },
        filtersContainer: {
            marginBottom: theme.spacing(3),
        },
    }))

const FiltersDefaultValue = {
    fullname: "",
    gender: "All",
    nationality: "All",
};

const filterByFullName = ({first, last}, fullname) => {
    return first?.toLowerCase().includes(fullname.toLowerCase()) ||
        last?.toLowerCase().includes(fullname.toLowerCase())
}

const filterByGender = (value, gender) => {
    if (gender === "All") {
        return true;
    }
    return value === gender;
//    return gender === "" || value === gender; //исключение || общий случай
}

const filterNationality = (value, nationality) => {
    if (nationality === "All") {
        return true;
    }
    return value === nationality;
}

export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    const [filters, setFilters] = useState(FiltersDefaultValue);


    // ВРУБИСЬ InputHandleChangeFilter
    const updateFilter = (name, value) => {
        // console.log(`event.name: ${event.target.name}\n event.value: ${event.target.value}`)
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters(FiltersDefaultValue);
    }

    // ВРУБИСЬ InputFilterByFullName
    const filteredContacts = contacts.data.filter(c =>
        filterByFullName(c.name, filters.fullname))
        .filter(c => filterByGender(c.gender, filters.gender))
        .filter(c => filterNationality(c.nat, filters.nationality));
    // console.log("filteredContacts", filteredContacts)

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

                        <ToggleDataViewMode dataViewMode={dataViewMode}
                                            setDataViewMode={setDataViewMode} />
                    </Box>

                {/*  INPUTS  */}
                </Grid>
                <Grid item xs={12} className={classes.filtersContainer}>

                    {/*   Filters   */}
                    <ContactsFilters filters={filters} updateFilter={ updateFilter } clearFilters={clearFilters} />

                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <CircularProgress data-testid="contacts-loader" />
                        }
                        if (contacts.isError) {
                            return <h2>error</h2>
                        }
                        if (dataViewMode === DATA_VIEW_MODE.TABLE) {
                            return <ContactsTable data={filteredContacts}/>
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
