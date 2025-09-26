import React from "react";
import {Grid, Paper, Box, Button, Container, Typography} from "@mui/material";

import krakenLogo from "../assets/kraken.webp";

export default function TestPage() {
  return (
    <React.Fragment>
      <ButtonComponent />
      <Grid1Component />
      <Grid2Component />
    </React.Fragment>
  );
}

const ButtonComponent = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Buttons</Typography>
      <Paper>
        <Box sx={{m: 1}} textAlign="center">
          <Button sx={{m: 1}} color="primary">primary</Button>
          <Button sx={{m: 1}} color="secondary">secondary</Button>
        </Box>
        <Box sx={{m: 1}} textAlign="center">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Box>
        <Box sx={{m: 1}} textAlign="center">
          <Button variant="text" color="secondary">Text</Button>
          <Button variant="contained" color="secondary">Contained</Button>
          <Button variant="outlined" color="secondary">Outlined</Button>
        </Box>
      </Paper>
    </Container>
  );
};

const Grid1Component = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Grid-1</Typography>
      <Grid container direction="row" justify="center" alignItems="stretch">
        {/* ROW 1 */}
        <Grid size={12}>
          <Paper>
            <Typography variant="h4" align="center">size (xs=12)</Typography>
          </Paper>
        </Grid>
        {/* ROW 2 */}
        <Grid size={3}>
          <Grid container alignItems="center" justifyContent="center" sx={{height: "100%"}}>
            <img src={krakenLogo} alt="krakenLogo" width="60" height="60" />
          </Grid>
        </Grid>
        {/* ROW 2 center column rowspan */}
        <Grid size={6}>
          <Grid container>
            <Grid size={12}>
              <Typography variant="h4" align="center">p1</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="h4" align="center">p2</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={3}>{/* empty */}</Grid>
      </Grid>
    </Container>
  );
};

const Grid2Component = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Grid-2</Typography>
      <Grid container justifyContent="center" size={12} spacing={0}>
        <GridRowComponent>
          <Typography variant="h4" align="center">1</Typography>
        </GridRowComponent>
        <GridRowComponent>
          <Typography variant="h4" align="center">2</Typography>
        </GridRowComponent>
        <GridRowComponent>
          <Typography variant="h4" align="center">3</Typography>
        </GridRowComponent>
      </Grid>
    </Container>
  );
};

const GridRowComponent = (props) => {
  return (
    <React.Fragment>
      <Grid size={{xs: 2, sm: 3, md: 4}} />
      <Grid size={{xs: 8, sm: 6, md: 4}} >
        {props.children}
      </Grid>
      <Grid size={{xs: 2, sm: 3, md: 4}} />
    </React.Fragment>
  );
};
