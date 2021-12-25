import React from 'react';

import {InputLabel, Paper, Box, Button, Container, FormControl, Select, MenuItem} from '@mui/material';

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
            <FormControl fullWidth>
              <InputLabel id="api">Verwendete Preis-API</InputLabel>
              <Select
                label="Verwendete Preis-API"
                MenuProps={{
                  sx: {
                    "&& .Mui-selected": {
                      color: "primary.contrastText",
                      backgroundColor: "primary.main"
                    }
                  }
                }}
              >
                <MenuItem value={10}>https://api.coingecko.com</MenuItem>
                <MenuItem value={20}>https://min-api.cryptocompare.com</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
