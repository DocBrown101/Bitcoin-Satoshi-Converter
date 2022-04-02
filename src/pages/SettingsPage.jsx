import React from "react";
import {useTranslation} from "react-i18next";

import {InputLabel, Paper, Box, Grid, Container, FormControl, Select, MenuItem, Typography, Button} from "@mui/material";

import {useLocalStorage} from "../services/LocalStorage";

export default function SettingsPage() {
  const [apiID, setApiID] = useLocalStorage("api-ID", 10);

  const handleChange = (event) => {setApiID(event.target.value);};

  const {t, i18n} = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <Container maxWidth="md">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{minHeight: "10vh"}}>
          <Typography variant="h4">{t("settings")}</Typography>
        </Grid>
        <Paper>
          <Box p={2}>
            <FormControl fullWidth>
              <InputLabel id="api-label">{t("ApiLabel")}</InputLabel>
              <Select id="api" label={t("ApiLabel")} value={apiID} onChange={handleChange}
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
        <Paper>
          <Box m={2} p={2} textAlign="center">
            <Typography variant="h6">{t("language")}</Typography>
            <Button sx={{m: 1}} variant="outlined" color="secondary" onClick={() => changeLanguage("de")}>DE</Button>
            <Button sx={{m: 1}} variant="outlined" color="secondary" onClick={() => changeLanguage("en")}>EN</Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
