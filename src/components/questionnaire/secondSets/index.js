import { Button, Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MultipleChoice from "../../../common/multipleChoice";
import { successTHubButtonStyles } from "../../../App";

function SecondSets({
  step,
  handleNext,
  handlePrevious,
  questionnaire,
  handleSelect,
}) {
  return (
    <Stack spacing={2}>
      <Box sx={{ p: 5 }}>
        <Typography
          color="gray"
          variant="h3"
          textAlign="center"
          sx={{ fontSize: "3rem" }}
        >
          {questionnaire[step - 14]?.question}
        </Typography>
      </Box>
      <Box sx={{ p: 5 }}>
        <MultipleChoice
          choices={questionnaire[step - 14]?.choices}
          ans={questionnaire[step - 14]?.answer}
          handleSelect={handleSelect}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {step > 1 ? (
          <Tooltip title="Previous Question" placement="top">
            <Button
              variant="contained"
              color="success"
              onClick={handlePrevious}
              style={{ ...successTHubButtonStyles }}
            >
              <ArrowBackIcon /> BACK
            </Button>
          </Tooltip>
        ) : (
          <div />
        )}
        {questionnaire[step - 14]?.answer !== null && (
          <Tooltip title="Next Question" placement="top">
            <Button
              variant="contained"
              color="success"
              onClick={handleNext}
              style={{ ...successTHubButtonStyles }}
            >
              NEXT <ArrowForwardIcon />
            </Button>
          </Tooltip>
        )}
      </Box>
    </Stack>
  );
}

export default SecondSets;
