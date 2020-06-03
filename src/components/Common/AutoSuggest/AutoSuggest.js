/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function AutoSuggest(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={props.options}
        getOptionLabel={(option) => option[props.optionLabel]}
        getOptionValue={(option) => option[props.optionValue]}
        defaultValue={props.selected}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={props.label}
            placeholder="type and select"
          />
        )}
        onChange={(event, newValue) => props.onChangeCB(newValue)}
        disabled={props.disabled}
      />
    </div>
  );
}