import React, {useEffect, useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {DATA_VIEW_MODE} from "../constants";
import {ToggleDataViewMode} from "./ToggleDataViewMode";
import {useDataViewMode} from "./useDataViewMode";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import {useContacts} from "./useContacts";
import Typography from "@material-ui/core/Typography";
import {ContactsTable} from "./ContactsTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";


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
        fieldGender: {
            minWidth: 120,
        }
    }))

const FiltersDefaultValue = {
    fullname: "",
    gender: "All"
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

export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    const [filters, setFilters] = useState(FiltersDefaultValue);


    // ВРУБИСЬ InputHandleChangeFilter
    const handleChangeFilter = (event) => {
        // console.log(`event.name: ${event.target.name}\n event.value: ${event.target.value}`)
        setFilters(prevFilters => ({
            ...prevFilters,
            [event.target.name]: event.target.value
        }))
    };

    // ВРУБИСЬ InputFilterByFullName
    const filteredContacts = contacts.data.filter(c =>
        filterByFullName(c.name, filters.fullname))
        .filter(c => filterByGender(c.gender, filters.gender));
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

                        <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode} />

                    </Box>

                {/*  INPUTS  */}
                </Grid>
                <Grid item xs={12} className={classes.filtersContainer}>
                    <Box display="flex">

                        <TextField name="fullname"
                                   label="Fullname"
                                   variant="outlined"
                                   size="small"
                                   value={filters.fullname}
                                   onChange={handleChangeFilter}
                        />


                        <FormControl size="small" variant="outlined" className={classes.fieldGender}>
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                labelId="gender"
                                label="Gender"
                                name="gender"
                                value={filters.gender}
                                onChange={handleChangeFilter}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>

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
