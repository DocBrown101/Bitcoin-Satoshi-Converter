import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingSpinner({withMinHeight = true}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(withMinHeight && {minHeight: "50vh"}),
      }}
    >
      <CircularProgress color="secondary" size="4rem" />
    </Box>
  );
}
