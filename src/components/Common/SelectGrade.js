import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = {
    checkIconFail: {
        color: 'red',
    },
    formControl: {
        margin: 5,
        minWidth: 120,
        maxWidth: 300,
    }
}
export function SelectGrade(props) {
    const { classes, title, value, onChangeCB, onChangeParam, schoolGradesList, errorDisplayStatus, errorText } = props 
    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="select-multiple-native">
                {title}
            </InputLabel>
            <Select
                native
                value={value}
                onChange={onChangeCB(onChangeParam)}
                inputProps={{
                id: 'select-multiple-native',
                }}
            >
                <option value="">{title}</option>
                {schoolGradesList.map((opt,key) => {
                let dispGradeName = opt.grade_name
                dispGradeName += opt.section_name ? " - "+opt.section_name : ''
                return (
                    <option key={key} value={opt.id}>
                    {dispGradeName} 
                    </option>
                    )
                }
                )}
            </Select>
            </FormControl>
            {errorDisplayStatus && 
                <FormHelperText className={classes.checkIconFail}>{errorText}</FormHelperText>
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(SelectGrade)