import React from "react";

import {InputLabel, Paper, Box, Grid, Container, FormControl, Select, MenuItem, Typography} from "@mui/material";

import {useLocalStorage} from "../services/LocalStorage";

export default function SettingsPage() {
  const [apiID, setApiID] = useLocalStorage("api-ID", 10);

  const handleChange = (event) => {setApiID(event.target.value);};

  return (
    <div>
      <Container maxWidth="md">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{minHeight: "10vh"}}>
          <Typography variant="h4">{"Settings"}</Typography>
        </Grid>
        <Paper>
          <Box p={2}>
            <FormControl fullWidth>
              <InputLabel id="api-label">Verwendete Preis-API</InputLabel>
              <Select id="api" label="Verwendete Preis-API" value={apiID} onChange={handleChange}
                MenuProps={{
                  sx: {
                    "&& .Mui-selected": {
                      color: "primary.contrastText",
                      backgroundColor: "primary.main",
                    },
                  },
                }}
              >
                <MenuItem value={10}>https://min-api.cryptocompare.com</MenuItem>
                <MenuItem value={20}>https://api.coingecko.com</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
