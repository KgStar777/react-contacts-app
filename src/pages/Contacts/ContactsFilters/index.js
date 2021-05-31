import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types"
import {NATIONALITIES_HUMAN_NAME} from "../../../constants/nationality";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) =>
    createStyles({
        fieldsContainer: {
            "& > *:not(:last-child)": {
                marginRight: theme.spacing(2),
            }
        },
        fieldGender: {
            minWidth: 120,
        },
        fieldNationality: {
            minWidth: 140,
        }
    }))

export const ContactsFilters = ({filters, updateFilter, clearFilters}) => {
    const handleChangeFilter = (event) => {
        updateFilter(event.target.name, event.target.value)
        // console.log(`event.name: ${event.target.name}\n event.value: ${event.target.value}`)
    };
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="space-between" >
            <Box display="flex" className={classes.fieldsContainer}>
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

                <FormControl size="small" variant="outlined" className={classes.fieldNationality}>
                    <InputLabel id="nationality">Nationality</InputLabel>
                    <Select
                        labelId="nationality"
                        label="Nationality"
                        name="nationality"
                        value={filters.nationality}
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {Object.entries(NATIONALITIES_HUMAN_NAME)
                            .map(([nationality, name]) => (
                                <MenuItem value={nationality} key={nationality}>
                                    { name }
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Box>

            <Button
                onClick={clearFilters}
                size="small"
                // variant="outlined"
                startIcon={<ClearIcon/>}
            >
                Clear
            </Button>
        </Box>

    );
};

ContactsFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
};
