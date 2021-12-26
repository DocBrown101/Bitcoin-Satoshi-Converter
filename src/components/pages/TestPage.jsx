import React from 'react';

import {InputLabel, Paper, Box, Button, Container, FormControl, Select, MenuItem} from '@mui/material';

import {useLocalStorage} from '../../services/LocalStorage';

export default function TestPage() { // Stateless Component
  const [apiID, setApiID] = useLocalStorage("api-ID", 10);

  const handleChange = (event) => {
    setApiID(event.target.value);
  };

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

      <Container maxWidth="sm">
        <Paper>
          <Box p={2}>
            <FormControl fullWidth>
              <InputLabel id="api-label">Verwendete Preis-API</InputLabel>
              <Select
                id="api"
                label="Verwendete Preis-API"
                value={apiID}
                onChange={handleChange}
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
