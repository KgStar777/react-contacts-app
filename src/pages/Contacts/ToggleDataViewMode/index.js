import React, { useCallback } from "react";
import {DATA_VIEW_MODE} from "../../constants";
import PropTypes from "prop-types"

//grid-table switcher
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


export const ToggleDataViewMode = ({ dataViewMode, setDataViewMode }) => {
    const handleChangeDataViewMode = useCallback( (_, nextView) => {
        setDataViewMode(nextView);
    }, [setDataViewMode]);

    return (
        <ToggleButtonGroup orientation="horizontal" value={dataViewMode}
                           exclusive
                           onChange={handleChangeDataViewMode}>
            <ToggleButton value={DATA_VIEW_MODE.GRID}
                          aria-label={DATA_VIEW_MODE.GRID}>
                <ViewModuleIcon/>
            </ToggleButton>
            <ToggleButton value={DATA_VIEW_MODE.TABLE}
                          aria-label={DATA_VIEW_MODE.TABLE}>
                <ViewListIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ToggleDataViewMode;

ToggleDataViewMode.propTypes = {
    dataViewMode: PropTypes.oneOf([DATA_VIEW_MODE.TABLE, DATA_VIEW_MODE.GRID]).isRequired,
    setDataViewMode: PropTypes.func.isRequired

}