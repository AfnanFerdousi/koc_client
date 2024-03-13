import { FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React from "react";

interface Props {
    value: string;
    handleChange: (param: string) => void;
    Icon: React.ReactNode;
    helperText: string;
    placeHolder: string;
}

const StartAodornmentField = ({
    value,
    handleChange,
    Icon,
    helperText,
    placeHolder,
}: Props) => {
    return (
        <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
                // id="outlined-adornment-weight"
                startAdornment={
                    <InputAdornment position="start">{Icon}</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                inputProps={{
                    "aria-label": "weight",
                }}
                placeholder={placeHolder}
                sx={{
                    m: 1,
                    backgroundColor: "#1f2029",
                    color: "#c4c3ca",
                    fontSize: "15px",
                    border: "none",
                    outline: "none !important",
                    fontFamily: "'Poppins', sans-serif",
                }}
                className="outline-field"
            />
            <FormHelperText id="outlined-weight-helper-text">
                {helperText}
            </FormHelperText>
        </FormControl>
    );
};

export default StartAodornmentField;
