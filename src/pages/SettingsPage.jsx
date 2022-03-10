import React from 'react';

import {Grid, Paper, Typography} from '@mui/material';

export default function SettingsPage() { // Stateless Component
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{minHeight: '30vh'}}
      >
        <Grid item xs={6} sx={{maxWidth: '90vw'}}>
          <Paper sx={{marginTop: "10px", textAlign: "center"}}>
            <Typography variant="h4" gutterBottom sx={{padding: "10px"}}>
              {"Settings ..."}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}