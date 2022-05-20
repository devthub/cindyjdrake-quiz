import {
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  FIVE_POINT_LIKERT_SCALE,
  FIVE_POINT_PERCENTAGE_SCALE,
  successTHubButtonStyles,
} from "../../../App";

const resultBoxStyles = {
  fontSize: "1.2em",
  marginTop: "1.5em",
};

function ShowAnswersDialog({
  onlyShowFirstSet,
  onlyShowSecondSet,
  onlyShowThirdSet,
  open,
  handleClose,
  scroll,
}) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [firstSets, setFirstSets] = React.useState([]);
  const [secondSets, setSecondSets] = React.useState([]);
  const [thirdSets, setThirdSets] = React.useState([]);

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      setFirstSets(JSON.parse(window.localStorage.getItem("_quiz_firstSets")));
      setSecondSets(
        JSON.parse(window.localStorage.getItem("_quiz_secondSets"))
      );
      setThirdSets(JSON.parse(window.localStorage.getItem("_quiz_thirdSets")));
    }
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="500px"
      >
        <DialogTitle id="scroll-dialog-title">Review Answers</DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          {onlyShowFirstSet && (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                  Mindset to GROW and SCALE
                </Typography>
              </Box>
              <Divider />
              {firstSets?.map((item, index) => {
                return (
                  <Stack key={`_quiz_firstSets:${index}`}>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" fontSize={15}>
                        {item.question_number}. {item.question}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" fontSize={15}>
                        Rating:{" "}
                        <strong style={{ color: "black" }}>
                          {item.use_percentage
                            ? FIVE_POINT_PERCENTAGE_SCALE[
                                parseInt(item.answer) - 1
                              ]
                            : FIVE_POINT_LIKERT_SCALE[
                                parseInt(item.answer) - 1
                              ]}
                        </strong>
                      </Typography>
                    </Box>
                    <Divider />
                  </Stack>
                );
              })}
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function QuizFinish() {
  const [firstSets, setFirstSets] = React.useState([]);
  const [secondSets, setSecondSets] = React.useState([]);
  const [thirdSets, setThirdSets] = React.useState([]);

  const [finalScore, setFinalScore] = React.useState(0);
  const [firstSetScore, setFirstSetScore] = React.useState(0);
  const [secondSetScore, setSecondSetScore] = React.useState(0);
  const [thirdSetScore, setThirdSetScore] = React.useState(0);

  const [onlyShowFirstSet, setOnlyShowFirstSet] = React.useState(false);
  const [onlyShowSecondSet, setOnlyShowSecondSet] = React.useState(false);
  const [onlyShowThirdSet, setOnlyShowThirdSet] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpenFirstSetDialog = (scrollType) => () => {
    setOpen(true);
    setOnlyShowFirstSet(true);
    setOnlyShowSecondSet(false);
    setOnlyShowThirdSet(false);
    setScroll(scrollType);
  };

  const handleClickOpenSecondSetDialog = (scrollType) => () => {
    setOpen(true);
    setOnlyShowFirstSet(false);
    setOnlyShowSecondSet(true);
    setOnlyShowThirdSet(false);
    setScroll(scrollType);
  };

  const handleClickOpenThirdSetDialog = (scrollType) => () => {
    setOpen(true);
    setOnlyShowFirstSet(false);
    setOnlyShowSecondSet(false);
    setOnlyShowThirdSet(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOnlyShowFirstSet(false);
    setOnlyShowSecondSet(false);
    setOnlyShowThirdSet(false);
    setOpen(false);
  };

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      setFirstSets(JSON.parse(window.localStorage.getItem("_quiz_firstSets")));
    }

    // document.getElementById("thank-you-section").style.display = "block";
    // document.getElementById("intro-section").style.display = "none";
    // document.getElementById("thank-you-section2").style.display = "block";
    // document.getElementById("intro-section2").style.display = "none";
  }, []);

  React.useEffect(() => {
    firstSets.forEach((item) => {
      setFinalScore((prevState) => prevState + parseInt(item.answer));
    });
  }, [firstSets]);

  const ResultCard = ({
    title,
    description,
    finalScore,
    onOpenDialogPress,
  }) => {
    return (
      <Card
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent style={{ marginBottom: "auto" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <span style={{ fontSize: "1.5rem" }}>Final Score: </span>
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {finalScore}
            </span>
          </Typography>
          <Typography variant="body1" stryle={{ fontSize: "2rem" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="outlined"
            onClick={onOpenDialogPress("paper")}
          >
            Show My Answers
          </Button>
        </CardActions>
      </Card>
    );
  };

  // const renderEachSectionResult = () => {
  //   const computeFirstSetPercentage = () => {
  //     const firstSet100PercentScore = 1160;
  //     return firstSetScore
  //       ? Number((firstSetScore / firstSet100PercentScore) * 100).toFixed(1)
  //       : 0;
  //   };

  //   const computeSecondSetPercentage = () => {
  //     const secondSet100PercentScore = 310;
  //     return secondSetScore
  //       ? Number((secondSetScore / secondSet100PercentScore) * 100).toFixed(1)
  //       : 0;
  //   };

  //   const computeThirdSetPercentage = () => {
  //     const thirdSet100PercentScore = 980;
  //     return thirdSetScore
  //       ? Number((thirdSetScore / thirdSet100PercentScore) * 100).toFixed(1)
  //       : 0;
  //   };

  //   return (
  //     <Grid container spacing={1}>
  //       <Grid item xs={12} lg={4}>
  //         <ResultCard
  //           title="Mindset to GROW and SCALE"
  //           description="This section looks into the mindset you’ve adopted in your
  //                 business and in life."
  //           finalScore={`${computeFirstSetPercentage()}%`}
  //           onOpenDialogPress={handleClickOpenFirstSetDialog}
  //         />
  //       </Grid>
  //     </Grid>
  //   );
  // };

  const renderResult = (finalScore) => {
    if (finalScore <= 9) {
      return (
        <Box sx={{ ...resultBoxStyles }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            fontFamily="monospace"
            marginBottom={1}
          >
            Overall Score: {finalScore}
          </Typography>
          <Typography variant="h3" textAlign="center" marginBottom={3}>
            Perfect Potential
          </Typography>
          <Box sx={{ backgroundColor: "rgb(255,255,255, 0.6)" }}>
            <Typography
              textAlign="center"
              fontFamily="monospace"
              fontWeight="bold"
              sx={{
                color: "#54595f",
                fontSize: 21,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
              }}
            >
              Your business is sucking the life out of you! You need to make
              some significant changes to get your life back!
            </Typography>
          </Box>
        </Box>
      );
    } else if (finalScore > 9 && finalScore <= 14) {
      return (
        <Box sx={{ ...resultBoxStyles }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            fontFamily="monospace"
            marginBottom={1}
          >
            Overall Score: {finalScore}
          </Typography>
          <Typography variant="h3" textAlign="center" marginBottom={3}>
            Super Duo
          </Typography>
          <Box sx={{ backgroundColor: "rgb(255,255,255, 0.6)" }}>
            <Typography
              textAlign="center"
              fontFamily="monospace"
              fontWeight="bold"
              sx={{
                color: "#54595f",
                fontSize: 21,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
              }}
            >
              Your business is quite taxing on your time and energy. You need to
              make some considerable changes
            </Typography>
          </Box>
        </Box>
      );
    } else if (finalScore > 14 && finalScore <= 19) {
      return (
        <Box sx={{ ...resultBoxStyles }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            fontFamily="monospace"
            marginBottom={1}
          >
            Overall Score: {finalScore}
          </Typography>
          <Typography variant="h3" textAlign="center" marginBottom={3}>
            Dream Team
          </Typography>
          <Box sx={{ backgroundColor: "rgb(255,255,255, 0.6)" }}>
            <Typography
              textAlign="center"
              fontFamily="monospace"
              fontWeight="bold"
              sx={{
                color: "#54595f",
                fontSize: 21,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
              }}
            >
              Your business is taking a fair bit of your energy and time away
              from things you enjoy. You may want to make some changes.
            </Typography>
          </Box>
        </Box>
      );
    } else if (finalScore > 19 && finalScore <= 24) {
      return (
        <Box sx={{ ...resultBoxStyles }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            fontFamily="monospace"
            marginBottom={1}
          >
            Overall Score: {finalScore}
          </Typography>
          <Typography variant="h3" textAlign="center" marginBottom={3}>
            Dream Team
          </Typography>
          <Box sx={{ backgroundColor: "rgb(255,255,255, 0.6)" }}>
            <Typography
              textAlign="center"
              fontFamily="monospace"
              fontWeight="bold"
              sx={{
                color: "#54595f",
                fontSize: 21,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
              }}
            >
              Your business and your life look good, just need a few tweaks here
              and there.
            </Typography>
          </Box>
        </Box>
      );
    } else if (finalScore >= 25) {
      return (
        <Box sx={{ ...resultBoxStyles }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            fontFamily="monospace"
            marginBottom={1}
          >
            Overall Score: {finalScore}
          </Typography>
          <Typography variant="h3" textAlign="center" marginBottom={3}>
            Dream Team
          </Typography>
          <Box sx={{ backgroundColor: "rgb(255,255,255, 0.6)" }}>
            <Typography
              textAlign="center"
              fontFamily="monospace"
              fontWeight="bold"
              sx={{
                color: "#54595f",
                fontSize: 21,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
              }}
            >
              You and your business are thriving! Stay the course!
            </Typography>
          </Box>
        </Box>
      );
    }
  };

  const computeFinalResultPercentage = () => {
    const final100PercentScore = 2450;
    return finalScore
      ? Number((finalScore / final100PercentScore) * 100).toFixed(1)
      : 0;
  };

  console.log("firstSets", firstSets);

  return (
    <>
      <ShowAnswersDialog
        open={open}
        scroll={scroll}
        handleClose={handleClose}
        onlyShowFirstSet={onlyShowFirstSet}
        onlyShowSecondSet={onlyShowSecondSet}
        onlyShowThirdSet={onlyShowThirdSet}
      />

      <Stack spacing={2}>
        <div
          style={{
            // backgroundImage: `url("https://transformhub.com.au/wp-content/uploads/2022/01/thub-confetti.gif")`,
            // width: "100%",
            // height: 500,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // opacity: 0.5,
            maxWidth: 800,
          }}
        >
          <Box display="flex" justifyContent="center">
            <Box>
              <Box
                display="flex"
                justifyContent="center"
                marginTop={1}
                marginBottom={5}
              >
                {renderResult(finalScore)}
              </Box>
            </Box>
          </Box>
        </div>

        <Divider />
        {/* <Box display="flex" justifyContent="space-between" alignItems="center">
          {renderEachSectionResult()}
        </Box> */}
        <Divider />

        {/* <Box alignItems="center" justifyContent="center">
          <Typography
            variant="h3"
            textAlign="center"
            marginBottom={3}
            marginTop={4}
          >
            You’re ready to take your business to new heights!
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              color: "#54595f",
              fontSize: 21,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
            }}
            marginBottom={3}
            variant="body1"
          >
            Well done!
            <br /> You’ve been off to a solid start, but now it’s time to really
            take charge of the direction your business will take. Boosting your
            CRM will be a fantastic first step for that. If you’re on board and
            want to improve your business growth, why not book a strategy call
            with us? Our expert team will guide you through the essential tools
            and empowering mindset that will help you like they did hundreds of
            other business owners!
          </Typography>
        </Box> */}
        <Box display="flex" justifyContent="center" marginTop={5}>
          <Button
            variant="contained"
            style={{ ...successTHubButtonStyles, marginBottom: "3rem" }}
            href="https://msgsndr.com/widget/booking/7SpCYaNJVfyQ9SCKGwW0"
            target="_blank"
            rel="noopener"
          >
            BOOK A STRATEGY CALL
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default QuizFinish;
