import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function TestPage() { // Stateless Component
  return (
    <div>
      <Container maxWidth="sm">
        <Paper>
          <Box m={2} p={2} textAlign="center">
            <Button color="primary">primary</Button>
            <Button color="secondary">secondary</Button>
          </Box>
        </Paper>
      </Container>

      <Container maxWidth="sm">
        <Paper>
          <Box p={2}>
            <Grid container justifyContent="center" item xs={12} spacing={0}>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Box textAlign="center">
                  Betrag eingeben:
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="left">
                  € Euro
                </Box>
              </Grid>

              <Grid item xs={4} />
              <Grid item xs={4}>
                <Box textAlign="center">
                  Betrag eingeben:
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="left">
                  ฿ Bitcoin
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
