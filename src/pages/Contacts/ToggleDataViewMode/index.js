import React, { useCallback } from "react";

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

export default Index;