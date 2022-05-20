import { Grid, Paper, Typography, Box } from "@mui/material";
import React from "react";

function MultipleChoice({ choices, ans, handleSelect }) {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ sm: 1 }}>
        {choices?.map((item, index) => {
          return (
            <Grid item xs={12} sm={12} key={index}>
              <Paper
                className="choices"
                sx={{
                  p: 1,
                  backgroundImage:
                    ans === index
                      ? "linear-gradient(90deg, rgba(58,97,180,0.40379901960784315) 0%, rgba(29,150,253,0.40940126050420167) 50%, rgba(0,86,255,0.3981967787114846) 100%)"
                      : "white",
                  color: "black",
                  cursor: "pointer",
                  border: "1px solid #F1F2F7",
                }}
                elevation={ans === index ? 3 : 0}
                onClick={() => handleSelect(index)}
              >
                <Box display="flex" alignItems="center">
                  <div
                    style={{
                      padding: 5,

                      color: ans === index ? "black" : "black",
                      // width: "35px",
                      // minWidth: "35px",
                      width: "20px",
                      minWidth: "20px",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "50%",
                      marginRight: 40,
                      fontWeight: "bold",
                    }}
                  >
                    {index === 0
                      ? "A"
                      : index === 1
                      ? "B"
                      : index === 2
                      ? "C"
                      : index === 3
                      ? "D"
                      : index === 4
                      ? "E"
                      : index === 5 && "E"}
                  </div>
                  <Typography variant="button" fontSize={15} fontWeight="bold">
                    {item}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default MultipleChoice;
