import {Grid, InputLabel, Paper, Box, Container, FormControl, Select, MenuItem, Typography, Button, ListItemIcon, ListItemText} from "@mui/material";
import {useTranslation} from "react-i18next";

import {useLocalStorage} from "../services/LocalStorage";
import ccLogo from "../assets/cc.webp";
import coingeckoLogo from "../assets/coingecko.webp";
import coinpaprika from "../assets/coinpaprika.webp";
import krakenLogo from "../assets/kraken.webp";

export default function SettingsPage() {
  const {t} = useTranslation();
  return (
    <div>
      <Container maxWidth="md">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{minHeight: "10vh"}}>
          <Typography variant="h4">{t("settings")}</Typography>
        </Grid>

        <SelectComponent />
        <LanguageComponent />

      </Container>
    </div>
  );
}

const SelectComponent = () => {
  const {t} = useTranslation();
  const [apiID, setApiID] = useLocalStorage("api-ID", 10);
  const handleChange = (event) => {setApiID(event.target.value);};
  return (
    <Paper>
      <Box p={2}>
        <FormControl fullWidth>
          <InputLabel id="api-label">{t("ApiLabel")}</InputLabel>
          <Select id="api" label={t("ApiLabel")} value={apiID} onChange={handleChange} required
            sx={{
              "&& div": {
                display: "flex"
              }
            }}
            MenuProps={{
              sx: {
                "&& .Mui-selected": {
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                },
              },
            }}
          >
            <MenuItem value={10}>
              <ListItemIcon sx={{minWidth: 34}}>
                <img src={ccLogo} alt="ccLogo" width="30" height="30" />
              </ListItemIcon>
              <ListItemText sx={{ml: 1}} primary="https://min-api.cryptocompare.com/" />
            </MenuItem>
            <MenuItem value={20}>
              <ListItemIcon sx={{minWidth: 34}}>
                <img src={coingeckoLogo} alt="coingeckoLogo" width="30" height="30" />
              </ListItemIcon>
              <ListItemText sx={{ml: 1}} primary="https://api.coingecko.com/" />
            </MenuItem>
            <MenuItem value={30}>
              <ListItemIcon sx={{minWidth: 34}}>
                <img src={coinpaprika} alt="coinpaprika" width="30" height="30" />
              </ListItemIcon>
              <ListItemText sx={{ml: 1}} primary="https://api.coinpaprika.com/" />
            </MenuItem>
            <MenuItem value={40}>
              <ListItemIcon sx={{minWidth: 34}}>
                <img src={krakenLogo} alt="krakenLogo" width="30" height="30" />
              </ListItemIcon>
              <ListItemText sx={{ml: 1}} primary="https://api.kraken.com/" />
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

const LanguageComponent = () => {
  const {t, i18n} = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Paper>
      <Box m={2} p={2} textAlign="center">
        <Typography variant="h6">{t("language")}</Typography>
        <Button sx={{m: 1}} variant="outlined" color="secondary" onClick={() => changeLanguage("de")}>DE</Button>
        <Button sx={{m: 1}} variant="outlined" color="secondary" onClick={() => changeLanguage("en")}>EN</Button>
      </Box>
    </Paper>
  );
};
