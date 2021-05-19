import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useCopyToClipboard } from "react-use";

import Button from "@material-ui/core/Box";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            cursor: 'pointer',
        },
        icon: {
            marginRight: theme.spacing(1),
        }
    })
);

const STATUS_COPY = {
    COPY: "copy",
    COPIED: "copied"
}

export const CopyToClipboardText = ({text}) => {

    const [, copyToClipboard] = useCopyToClipboard();

    const classes = useStyles();
    const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);

    const getTooltipTitle = () => {
        switch (statusCopy) {
            case STATUS_COPY.COPY:
                return "Copy";
            case STATUS_COPY.COPIED:
                return "Copied";
            default:
                return "";
        }
    };

    const onClickCopy = useCallback(() => {
        copyToClipboard(text);
        setStatusCopy(STATUS_COPY.COPIED);
    }, [copyToClipboard, text])

    const onClickAway = useCallback(() => {
        setStatusCopy(STATUS_COPY.COPY);
    }, [setStatusCopy])

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <Tooltip title={getTooltipTitle()} arrow>
                <Button className={classes.root} onClick={onClickCopy}>
                    <FileCopyOutlinedIcon fontSize="small" className={classes.icon}/>
                    {text}
                </Button>
            </Tooltip>
        </ClickAwayListener>
    )
};

CopyToClipboardText.propTypes = {
    text: PropTypes.string.isRequired,
};