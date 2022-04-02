import React from 'react';

import {Paper, Box, Button, Container} from '@mui/material';

export default function TestPage() { // Stateless Component
  return (
    <div>
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
    </div>
  );
}
