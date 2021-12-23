import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function SettingsPage() { // Stateless Component
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{minHeight: '30vh'}}
      >
        <Grid item xs={6} style={{maxWidth: '90vw'}}>
          <Paper style={{marginTop: "10px", textAlign: "center"}}>
            <Typography variant="h4" gutterBottom style={{padding: "10px"}}>
              {"Settings ..."}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}