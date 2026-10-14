import React, { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import krakenLogo from '../assets/kraken.webp';
import LoadingSpinner from '../components/LoadingSpinner';

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
    <Container maxWidth='sm'>
      <Typography variant='h6'>Buttons</Typography>
      <Paper>
        <Box sx={{ m: 1, textAlign: 'center' }}>
          <Button sx={{ m: 1 }} color='primary'>
            primary
          </Button>
          <Button sx={{ m: 1 }} color='secondary'>
            secondary
          </Button>
        </Box>
        <Box sx={{ m: 1, textAlign: 'center' }}>
          <Button variant='text'>Text</Button>
          <Button variant='contained'>Contained</Button>
          <Button variant='outlined'>Outlined</Button>
        </Box>
        <Box sx={{ m: 1, textAlign: 'center' }}>
          <Button variant='text' color='secondary'>
            Text
          </Button>
          <Button variant='contained' color='secondary'>
            Contained
          </Button>
          <Button variant='outlined' color='secondary'>
            Outlined
          </Button>
        </Box>
      </Paper>
      <LoadingSpinner withMinHeight={false} />
    </Container>
  );
};

const Grid1Component = () => {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h6'>Grid-1</Typography>
      <Grid container direction='row' sx={{ alignItems: 'stretch' }}>
        {/* ROW 1 */}
        <Grid size={12}>
          <Paper>
            <Typography variant='h4' align='center'>
              size (xs=12)
            </Typography>
          </Paper>
        </Grid>
        {/* ROW 2 */}
        <Grid size={3}>
          <Grid container sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <img src={krakenLogo} alt='krakenLogo' width='60' height='60' />
          </Grid>
        </Grid>
        {/* ROW 2 center column rowspan */}
        <Grid size={6}>
          <Grid container>
            <Grid size={12}>
              <Typography variant='h4' align='center'>
                p1
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant='h4' align='center'>
                p2
              </Typography>
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
    <Container maxWidth='sm'>
      <Typography variant='h6'>Grid-2</Typography>
      <Grid container sx={{ justifyContent: 'center' }} spacing={0}>
        <GridRowComponent>
          <Typography variant='h4' align='center'>
            1
          </Typography>
        </GridRowComponent>
        <GridRowComponent>
          <Typography variant='h4' align='center'>
            2
          </Typography>
        </GridRowComponent>
        <GridRowComponent>
          <Typography variant='h4' align='center'>
            3
          </Typography>
        </GridRowComponent>
      </Grid>
    </Container>
  );
};

const GridRowComponent = ({ children }: { children: ReactNode }) => {
  return (
    <React.Fragment>
      <Grid size={{ xs: 2, sm: 3, md: 4 }} />
      <Grid size={{ xs: 8, sm: 6, md: 4 }}>{children}</Grid>
      <Grid size={{ xs: 2, sm: 3, md: 4 }} />
    </React.Fragment>
  );
};
