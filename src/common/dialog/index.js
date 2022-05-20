import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, Box, Stack, Divider } from "@mui/material";
import {
  FIVE_POINT_LIKERT_SCALE,
  FIVE_POINT_PERCENTAGE_SCALE,
} from "../../App";

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    }
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen("paper")}
      >
        Review my Answers
      </Button>
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
          <Box sx={{ mt: 5, mb: 2 }}>
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
                    Answer:{" "}
                    <strong style={{ color: "black" }}>
                      {item.choices[Math.abs(parseInt(item.answer) - 5)]}
                    </strong>
                  </Typography>
                </Box>
                <Divider />
              </Stack>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
