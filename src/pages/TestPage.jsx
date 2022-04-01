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
            <Button sx={{m: 1}} variant="contained" color="primary">primary</Button>
            <Button sx={{m: 1}} variant="contained" color="secondary">secondary</Button>
          </Box>
        </Paper>
      </Container>      
    </div>
  );
}
