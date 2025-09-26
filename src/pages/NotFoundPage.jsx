import {useTranslation} from "react-i18next";
import {Grid, Box, Paper, Typography} from '@mui/material';

export default function NotFoundPage() {
  const {t} = useTranslation();
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
        <Box sx={12}>
          <Paper sx={{marginTop: "10px", textAlign: "center"}}>
            <Typography variant="h4" gutterBottom sx={{padding: "10px"}}>{t("PageNotFound")}</Typography>
          </Paper>
        </Box>
      </Grid>
    </div>
  );
}
