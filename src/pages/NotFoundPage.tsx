import { useTranslation } from 'react-i18next';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div>
      <Stack sx={{ minHeight: '30vh', alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ marginTop: '10px', textAlign: 'center' }}>
          <Typography variant='h4' gutterBottom sx={{ padding: '10px' }}>
            {t('PageNotFound')}
          </Typography>
        </Paper>
      </Stack>
    </div>
  );
}
