import React from 'react';

import {Paper, Box, Button, Container, Grid, Typography} from '@mui/material';

import krakenLogo from "../assets/kraken.webp";

export default function TestPage() {
  return (
    <React.Fragment>
      <ButtonComponent />
      <GridComponent />
    </React.Fragment>
  );
}

const ButtonComponent = () => {
  return (
    <Container maxWidth="sm">
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

const GridComponent = () => {
  return (
    <Container maxWidth="sm">
      <Grid container direction="row" justify="center" alignItems="stretch">
        {/* ROW 1 */}
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" align='center'>xs=12</Typography>
          </Paper>
        </Grid>
        {/* ROW 2 */}
        <Grid item xs={3}>
          <Grid container alignItems="center" justifyContent="center" style={{height: "100%"}}>
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
