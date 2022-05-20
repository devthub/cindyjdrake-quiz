import { Typography, Button, Tooltip, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";
import FirstSets from "./components/questionnaire/firstSets";
import SecondSets from "./components/questionnaire/secondSets";
import ThirdSets from "./components/questionnaire/thirdSets";
import QuizFinish from "./components/questionnaire/quizFinish";
import ScrollDialog from "./common/dialog";
import "./index.css";
import { questionnaire } from "./initialState/questionnaire";

export const successTHubButtonStyles = {
  fontFamily: '"Montserrat", Sans-serif',
  fontWeight: 700,
  fontSize: "1em",
  textTransform: "uppercase",
  lineHeight: "1.2em",
  letterSpacing: "0.6px",
  fill: "#FFFFFF",
  color: "#FFFFFF",
  backgroundColor: "#3F779D",
  boxShadow: "0px 1px 1px 0.5px rgb(0 0 0 / 30%)",
  padding: "1.2em",
};

export const handleClick_ReTake = () => {
  window.localStorage.removeItem("_quiz_step");
  window.localStorage.removeItem("_quiz_firstSets");
  window.localStorage.removeItem("_quiz_secondSets");
  window.localStorage.removeItem("_quiz_thirdSets");
  window.location.reload();
};

export const FIVE_POINT_LIKERT_SCALE = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export const FIVE_POINT_PERCENTAGE_SCALE = ["20%", "40%", "60%", "80%", "100%"];

function App() {
  const [step, setStep] = React.useState(0);
  const [firstSets, setFirstSets] = React.useState([]);

  React.useEffect(() => {
    let steps = parseInt(window.localStorage.getItem("_quiz_step"));
    let firstSets = JSON.parse(window.localStorage.getItem("_quiz_firstSets"));

    setStep(!steps ? 0 : steps);
    setFirstSets(!firstSets ? questionnaire.slice(0, 5) : firstSets);
  }, []);

  const handleNext = () => {
    setStep(parseInt(step) + 1);
    window.localStorage.setItem("_quiz_step", step + 1);
    window.localStorage.setItem("_quiz_firstSets", JSON.stringify(firstSets));
  };
  const handlePrevious = () => {
    setStep(parseInt(step) - 1);
    window.localStorage.setItem("_quiz_firstSets", step + 1);
    window.localStorage.setItem("_quiz_firstSets", JSON.stringify(firstSets));
  };

  const handleChangeFirstSets = (e) => {
    firstSets[step - 1].answer = e.target.value;
    setFirstSets((prevState) => [...prevState]);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {firstSets.length === 0 ? (
          <div>Loading</div>
        ) : (
          <Box sx={{ width: 800, minHeight: 400 }}>
            {step === 0 ? (
              <Box style={{ marginTop: 30 }}>
                <Typography
                  variant="h3"
                  sx={{ color: "gray", fontSize: 30 }}
                  textAlign="center"
                  marginBottom={1}
                >
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Is Your Business Sucking the Life Out of You?
                  </span>
                </Typography>
                <Typography
                  sx={{ color: "gray", fontSize: 24 }}
                  textAlign="center"
                  marginBottom={2}
                >
                  As a business owner, you may be stuck on the treadmill of life
                  trying to work yourself to a better place but struggling to
                  see progress. This quiz will help you figure out where you’re
                  at:
                </Typography>

                <Divider />
                <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setStep(1)}
                    style={{ ...successTHubButtonStyles }}
                  >
                    Start quiz <ArrowForwardIcon />
                  </Button>
                </Box>
              </Box>
            ) : step >= 1 && step <= 5 ? (
              <FirstSets
                questionnaire={firstSets}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                step={step}
                handleChange={handleChangeFirstSets}
                value={firstSets[step - 1]?.answer}
              />
            ) : step === 6 ? (
              <Box style={{ marginTop: 140 }}>
                <Typography
                  variant="h5"
                  sx={{ color: "gray", fontSize: 30 }}
                  textAlign="center"
                  marginBottom={3}
                >
                  IF YOU ARE SURE WITH YOUR ANSWERS PLEASE CLICK FINISH
                </Typography>
                <Divider />
                <Box
                  sx={{
                    p: 5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Tooltip title="Go Back" placement="top">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handlePrevious}
                      style={{ ...successTHubButtonStyles }}
                    >
                      <ArrowBackIcon /> BACK
                    </Button>
                  </Tooltip>
                  <ScrollDialog />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleNext}
                    style={{ ...successTHubButtonStyles }}
                  >
                    FINISH
                  </Button>
                </Box>
              </Box>
            ) : (
              <QuizFinish />
            )}
          </Box>
        )}
      </Box>

      {step >= 1 && (
        <Box display="flex" justifyContent="center" marginTop={5}>
          <Button
            variant="contained"
            color="success"
            onClick={handleClick_ReTake}
            style={{ ...successTHubButtonStyles }}
          >
            Re-Take Quiz <RefreshIcon />
          </Button>
        </Box>
      )}
    </>
  );
}

export default App;
