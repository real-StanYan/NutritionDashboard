import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

import "./index.css";

const CssOutlinedInput = styled(OutlinedInput)({
  "& .MuiTypography-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    color: "white",
  },
  "& fieldset": {
    borderColor: "white",
  },
  "& input:focus + fieldser": {
    borderColor: "white",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Male", "Female"];

const intensityList = [
  "Basically sitting all the time(basically no movement",
  "Light activity (light-intensity exercise 1-3 times a week",
  "Moderate activity (moderate-intensity exercise 3 to 5 times a week",
  "Very active (6-7 high-intensity exercise a week",
  "Hyperactive (daily vigorous exercise and heavy physical work",
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Userinfor() {
  const theme = useTheme();
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [intensity, setIntensity] = React.useState("");
  const [weightError, setWeightError] = React.useState(false);
  const [heightError, setHeightError] = React.useState(false);
  const [ageError, setAgeError] = React.useState(false);
  const [genderError, setGenderError] = React.useState(false);

  const inputWeight = (e: any) => {
    if (!+e.target.value) {
      console.log("error");
      setWeightError(true);
    } else if (+e.target.value < 0 || +e.target.value > 500) {
      setWeightError(true);
    } else {
      setWeightError(false);
      setWeight(e.target.value);
    }
  };
  const inputHeight = (e: any) => {
    if (!+e.target.value) {
      setHeightError(true);
    } else if (+e.target.value < 0 || +e.target.value > 250) {
      setHeightError(true);
    } else {
      setHeightError(false);
      setHeight(e.target.value);
    }
  };
  const inputAge = (e: any) => {
    if (!+e.target.value) {
      setAgeError(true);
    } else if (+e.target.value < 0 || +e.target.value > 150) {
      setAgeError(true);
    } else {
      setAgeError(false);
      setAge(e.target.value);
    }
  };
  const inputGender = (e: any) => {
    setGender(e.target.value);
  };
  const inputIntensity = (e: any) => {
    setIntensity(e.target.value);
  };

  return (
    <div className="userinfor-wrapper">
      <div className="userinfor-forms">
        <div className="form-control">
          <CssOutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            onChange={inputWeight}
            error={weightError}
          />
          <FormHelperText id="outlined-weight-helper-text">
            Weight
          </FormHelperText>
        </div>
        <div className="form-control">
          <CssOutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            onChange={inputHeight}
            error={heightError}
          />
          <FormHelperText id="outlined-weight-helper-text">
            Height
          </FormHelperText>
        </div>
        <div className="form-control">
          <input
            type="number"
            onChange={inputAge}
            style={{ borderColor: ageError ? "red" : "white" }}
          />
          <FormHelperText id="outlined-weight-helper-text">Age</FormHelperText>
        </div>
        <div className="form-control" onChange={inputGender}>
          <select name="" id="">
            <option selected>Select your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <FormHelperText id="outlined-weight-helper-text">
            Gender
          </FormHelperText>
        </div>
        <div className="form-control">
          <select name="" id="" onChange={inputIntensity}>
            <option selected>Select your daily exercise intensity</option>
            <option value="basically-sitting-all-the-time">
              Basically sitting all the time(basically no movement)
            </option>
            <option value="light-activity">
              Light activity (light-intensity exercise 1-3 times a week)
            </option>
            <option value="moderate-activity">
              Moderate activity (moderate-intensity exercise 3 to 5 times a
              week)
            </option>
            <option value="very-active">
              Very active (6-7 high-intensity exercise a week)
            </option>
            <option value="hyperactive">
              Hyperactive (daily vigorous exercise and heavy physical work)
            </option>
          </select>
          <FormHelperText id="outlined-weight-helper-text">
            Daily Exercise Intensity
          </FormHelperText>
        </div>
        <Button variant="contained">Submit</Button>
      </div>
    </div>
  );
}
