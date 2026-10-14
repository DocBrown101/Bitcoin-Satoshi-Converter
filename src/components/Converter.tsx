import { type ReactNode, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useTranslation } from 'react-i18next';

import Alert from '@mui/material/Alert';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ConverterStore from '../stores/ConverterStore';
import InputElement from './InputElement';

export default function Converter() {
  const eurFiatPrice = ConverterStore((state) => state.eurFiatPrice);
  const oneFiatSats = ConverterStore((state) => state.oneFiatSats);
  const convertedEuro = ConverterStore((state) => state.convertedEuro);
  const convertedBitcoin = ConverterStore((state) => state.convertedBitcoin);
  const convertedSatoshi = ConverterStore((state) => state.convertedSatoshi);
  const onEuroInputChange = ConverterStore((state) => state.onEuroInputChange);
  const onBitcoinInputChange = ConverterStore((state) => state.onBitcoinInputChange);
  const onSatoshiInputChange = ConverterStore((state) => state.onSatoshiInputChange);
  const resetConvertedState = ConverterStore((state) => state.resetConvertedState);
  const { t } = useTranslation();
  const [clipboardError, setClipboardError] = useState(false);
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      setClipboardError(true);
    }
  };
  return (
    <Box sx={{ my: 2 }}>
      <Paper>
        <Box sx={{ p: 2 }}>
          <Box sx={{ m: 'auto', textAlign: 'center' }}>
            <Typography color='secondary' variant='h6'>
              {Number(oneFiatSats) > 0 ? (
                <Box sx={{ fontFamily: 'Monospace', fontWeight: 'fontWeightBold', fontSize: 'inherit', mb: 2 }}>
                  <NumericFormat value={oneFiatSats} displayType={'text'} decimalScale={0} fixedDecimalScale={true} prefix={'1 € ≙ '} suffix={' シ Satoshi'} thousandSeparator={'.'} decimalSeparator={','} />
                </Box>
              ) : (
                <Box sx={{ fontFamily: 'Monospace', fontWeight: 'fontWeightBold', fontSize: 'inherit', mb: 2 }}>1 € ≙ ? Satoshi</Box>
              )}
            </Typography>
            <Typography variant='h6'>{t('EnterAmount')}</Typography>
          </Box>

          <Stack spacing={2} sx={{ alignItems: 'center', mt: 1, mb: 2 }}>
            <InputRow
              input={<InputElement label='€ Euro' endLabel='EUR' value={convertedEuro} disabled={eurFiatPrice <= 0} onInputChange={onEuroInputChange} />}
              button={
                <IconButton aria-label={t('ClearAmounts')} onClick={() => resetConvertedState()}>
                  <BackspaceOutlinedIcon />
                </IconButton>
              }
            />
            <InputRow
              input={<InputElement label='฿ Bitcoin' endLabel='BTC' value={convertedBitcoin} disabled={eurFiatPrice <= 0} onInputChange={onBitcoinInputChange} />}
              button={
                <IconButton aria-label={t('CopyBitcoin')} disabled={!convertedBitcoin} onClick={() => copyToClipboard(convertedBitcoin)}>
                  <ContentCopyIcon />
                </IconButton>
              }
            />
            <InputRow
              input={<InputElement label='シ Satoshi' endLabel='sat' value={convertedSatoshi} disabled={eurFiatPrice <= 0} onInputChange={onSatoshiInputChange} />}
              button={
                <IconButton aria-label={t('CopySatoshi')} disabled={!convertedSatoshi} onClick={() => copyToClipboard(convertedSatoshi)}>
                  <ContentCopyIcon />
                </IconButton>
              }
            />
          </Stack>
        </Box>
      </Paper>
      <Snackbar open={clipboardError} autoHideDuration={6000} onClose={() => setClipboardError(false)}>
        <Alert severity='error' onClose={() => setClipboardError(false)}>
          {t('CopyFailed')}
        </Alert>
      </Snackbar>
    </Box>
  );
}

interface InputRowProps {
  input: ReactNode;
  button: ReactNode;
}

const InputRow = ({ input, button }: InputRowProps) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '40px minmax(0, 300px) 40px', gap: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{ gridColumn: 2, minWidth: 0, '& .MuiTextField-root': { width: '100%' } }}>{input}</Box>
    <Box sx={{ gridColumn: 3 }}>{button}</Box>
  </Box>
);
