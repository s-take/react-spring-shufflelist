import React, { useState } from "react";
import "./App.css";
import { useTransition, animated } from "react-spring";
import shuffle from "lodash.shuffle";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";

import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: "white",
  background: "navy",
  width: 400,
  height: 40,
  lineHeight: "40px",
}));

let data = [{ name: "テストA" }, { name: "テストB" }, { name: "テストC" }];

function App() {
  const [rows, setRows] = useState(data);
  const [value, setValue] = useState("");

  let height = 0;
  let itemHeight = 40;

  const transitions = useTransition(
    rows.map((data) => ({
      ...data,
      y: (height += itemHeight * 0.5) - itemHeight,
      height: itemHeight,
    })),
    {
      key: (item: any) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    }
  );

  return (
    <div className="App">
      <Box m={4}>
        <h2>Shuffle List</h2>
        <Grid container justifyContent="center" rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              label="入力して追加を押してください"
              variant="outlined"
              onChange={(event) => setValue(event.target.value)}
              sx={{ mr: 4 }}
            />
            <Button
              variant="contained"
              onClick={() => setRows([{ name: value }, ...rows])}
              sx={{ mr: 4, mt: 2 }}
            >
              追加
            </Button>
            <Button
              variant="contained"
              onClick={() => setRows(rows.slice(1))}
              sx={{ mt: 2 }}
            >
              削除
            </Button>
          </Grid>
          <Box m={1} />
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => setRows(shuffle(rows))}>
              シャッフル
            </Button>
            <Box m={4} />
          </Grid>
          <Grid item>
            {transitions((style, item, t, index) => (
              <animated.div style={{ zIndex: data.length - index, ...style }}>
                <Item>
                  {index + 1} : {item.name}
                </Item>
              </animated.div>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
