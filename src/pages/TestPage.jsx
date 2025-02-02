import React from 'react';

import {Paper, Box, Button, Container, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';

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
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" align='center'>xs=12</Typography>
          </Paper>
        </Grid>
        {/* ROW 2 */}
        <Grid item xs={3}>
          <Grid container alignItems="center" justifyContent="center" sx={{height: "100%"}}>
            <img src={krakenLogo} alt="krakenLogo" width="60" height="60" />
          </Grid>
        </Grid>
        {/* ROW 2 center column rowspan */}
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" align='center'>p1</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align='center'>p2</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          {/* empty */}
        </Grid>
      </Grid>
    </Container>
  );
};

const Grid2Component = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Grid-2</Typography>
      <Grid container justifyContent="center" item xs={12} spacing={0}>
        <GridRowComponent>
          <Typography variant="h4" align='center'>1</Typography>
        </GridRowComponent>
        <GridRowComponent>
          <Typography variant="h4" align='center'>2</Typography>
        </GridRowComponent>
        <GridRowComponent>
          <Typography variant="h4" align='center'>3</Typography>
        </GridRowComponent>
      </Grid>
    </Container>
  );
};

const GridRowComponent = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={2} sm={3} md={4} />
      <Grid item xs={8} sm={6} md={4} sx={{maxWidth: "300px"}}>
        {props.children}
      </Grid>
      <Grid item xs={2} sm={3} md={4} />
    </React.Fragment>
  );
};
