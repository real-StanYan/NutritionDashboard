import React, { useEffect } from "react";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { userInforList, bodyMeasured, calNutrition } from "../../store/main";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

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

export default function Userinfor(props: any) {
  const data: any = useSelector((state) => state);
  const id = data.main.id;
  const BMI = data.main.BMI;
  const dispatch = useDispatch();
  const isBodyMeasure = localStorage.getItem("isBodyMeasure");
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
  const [bodyMeasureError, setBodyMeasureError] = React.useState(false);
  const [bodyMeasureSuccess, setBodyMeasureSuccess] = React.useState(false);
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setBodyMeasureError(false);
    setBodyMeasureSuccess(false);
  };

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
  const bodyMeasureRequest = (e: any) => {
    if (weightError || heightError || ageError || genderError) {
      setBodyMeasureError(true);
    } else {
      axios
        .post("http://localhost:8888/bodymeasure", {
          id,
          weight,
          height,
          age,
          gender,
          intensity,
          BMI,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("isBodyMeasure", "true");
          dispatch(bodyMeasured(true));
          setBodyMeasureSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setBodyMeasureError(true);
        });
    }
  };
  const updateInfor = () => {
    localStorage.setItem("isBodyMeasure", "false");
    axios
      .delete(`http://localhost:8888/bodymeasure/${id}`)
      .then((res) => {
        console.log(res);
        dispatch(bodyMeasured(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8888/bodymeasure/${id}`)
      .then((res) => {
        console.log("123", res);
        dispatch(userInforList(res.data));
        dispatch(calNutrition(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="userinfor-wrapper">
      {isBodyMeasure === "true" ? (
        <ul className="userinfor-table">
          <li>
            <span>Height:</span> {data.main.userInforList.height}cm
          </li>
          <li>
            <span>Weight:</span> {data.main.userInforList.weight}kg
          </li>
          <li>
            <span>Age:</span> {data.main.userInforList.age}
          </li>
          <li>
            <span>Gender:</span> {data.main.userInforList.gender}
          </li>
          <li>
            <span>Intensity:</span> {data.main.userInforList.intensity}
          </li>
          <Button variant="contained" onClick={updateInfor}>
            Update Information
          </Button>
        </ul>
      ) : (
        <div className="userinfor-forms">
          {/* Register-Failed-Message */}
          <Snackbar
            open={bodyMeasureError}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Register Failed!
            </Alert>
          </Snackbar>
          {/* Register-Successed-Message */}
          <Snackbar
            open={bodyMeasureSuccess}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Register Successed!
            </Alert>
          </Snackbar>
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
            <FormHelperText id="outlined-weight-helper-text">
              Age
            </FormHelperText>
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
          <Button variant="contained" onClick={bodyMeasureRequest}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
