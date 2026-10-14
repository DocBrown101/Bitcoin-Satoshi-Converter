import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useTranslation } from 'react-i18next';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConverterStore from '../stores/ConverterStore';
import calculateHalvingData from '../services/HalvingCalculator';
import { parseMempoolMessage, type FeeData, type BlockData } from '../services/MempoolData';
import { convertSatsToEuro } from '../utils/currencyConverter';

const WS_URL = 'wss://mempool.space/api/v1/ws';

const formatDate = (date: Date, timeZone: string, locales: string) => {
  return new Intl.DateTimeFormat(locales, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).format(date);
};

// https://mempool.space/de/docs/api/websocket
export default function MempoolWsComponent() {
  const [webSocketReady, setWebSocketReady] = useState(false);
  const [connectionLost, setConnectionLost] = useState(false);
  const [lastFeeData, setLastFeeData] = useState<FeeData>();
  const [lastBlockData, setLastBlockData] = useState<BlockData>();
  const [lastTimeAvg, setLastTimeAvg] = useState<number>();

  useEffect(() => {
    let stopped = false;
    let socket: WebSocket;
    let retryDelay = 1000;
    let timer: ReturnType<typeof setTimeout>;
    const connect = () => {
      if (stopped) return;
      socket = new WebSocket(WS_URL);
      socket.onopen = () => {
        setWebSocketReady(true);
        setConnectionLost(false);
        retryDelay = 1000;
        socket.send(JSON.stringify({ action: 'init' }));
        socket.send(JSON.stringify({ action: 'want', data: ['stats', 'mempool-blocks', 'blocks'] }));
      };
      socket.onmessage = (event: MessageEvent) => {
        if (typeof event.data !== 'string') return;
        const data = parseMempoolMessage(event.data);
        if (data.timeAvg !== undefined) setLastTimeAvg(data.timeAvg);
        if (data.fees) setLastFeeData(data.fees);
        if (data.block) setLastBlockData(data.block);
      };
      socket.onclose = () => {
        if (stopped) return;
        setWebSocketReady(false);
        setConnectionLost(true);
        timer = setTimeout(connect, retryDelay);
        retryDelay = Math.min(retryDelay * 2, 30_000);
      };
      socket.onerror = () => socket.close();
    };
    // Defer opening so StrictMode's initial cleanup does not open an unused socket.
    timer = setTimeout(connect, 0);
    return () => {
      stopped = true;
      clearTimeout(timer);
      if (socket) {
        socket.onopen = socket.onmessage = socket.onclose = socket.onerror = null;
        socket.close();
      }
    };
  }, []);

  const { t } = useTranslation();
  const halvingLoading = !lastBlockData || !lastTimeAvg;
  const loadingTitle = webSocketReady ? t('WaitingForMessage') : t('PleaseWait');

  return (
    <React.Fragment>
      {connectionLost && (
        <Alert severity='warning' sx={{ my: 2 }}>
          {t('ConnectionLost')}
        </Alert>
      )}
      <Box sx={{ mb: 2 }}>
        <Container maxWidth='sm'>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>{halvingLoading ? loadingTitle : t('BitcoinHalving')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ mb: 2 }}>{t('HalvingText.line1')}</Typography>
              <Typography sx={{ mb: 2 }}>{t('HalvingText.line2')}</Typography>
              <Typography>{t('HalvingText.line3')}</Typography>
            </AccordionDetails>
          </Accordion>
          <Paper>
            <HalvingComponent blockData={lastBlockData} timeAvg={lastTimeAvg} />
          </Paper>
        </Container>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Container maxWidth='sm'>
          <Typography variant='h6'>{t('CurrentTransactionFees')}</Typography>
          <Typography variant='caption'>{t('FeeEstimate', { vbytes: 140 })}</Typography>
          <CurrentFeesComponent feeData={lastFeeData} />
        </Container>
      </Box>
    </React.Fragment>
  );
}

interface HalvingComponentProps {
  blockData?: BlockData;
  timeAvg?: number;
}

const HalvingComponent = ({ blockData, timeAvg }: HalvingComponentProps) => {
  const { t } = useTranslation();

  if (!blockData || !timeAvg) {
    return <Skeleton variant='rounded' height={120} />;
  }

  const halvingData = calculateHalvingData(timeAvg, blockData.height);
  const date = formatDate(halvingData.estimatedDate, t('TimeZone'), t('Locales'));

  return (
    <Box sx={{ fontFamily: 'Monospace', fontWeight: 'fontWeightBold', textAlign: 'center', p: 2 }}>
      <Typography color='secondary' variant='h6'>
        <NumericFormat value={halvingData.blocksToNextHalving} displayType={'text'} decimalScale={0} fixedDecimalScale={true} suffix={t('MissingBlocks')} thousandSeparator={'.'} decimalSeparator={','} />
      </Typography>
      <Typography>{t('HalvingDuration', { days: halvingData.estimatedDays, hours: halvingData.estimatedHours, minutes: halvingData.estimatedMinutes })}</Typography>
      <Typography variant='h6' color='secondary'>
        {date}
      </Typography>
    </Box>
  );
};

interface CurrentFeesComponentProps {
  feeData?: FeeData;
}

const CurrentFeesComponent = ({ feeData }: CurrentFeesComponentProps) => {
  const eurFiatPrice = ConverterStore((state) => state.eurFiatPrice);
  const { t } = useTranslation();

  if (!feeData) {
    return <Skeleton variant='rounded' height={184} />;
  }

  const fastest = convertSatsToEuro(feeData.fastestFee * 140, eurFiatPrice) || '?';
  const medium = convertSatsToEuro(feeData.hourFee * 140, eurFiatPrice) || '?';
  const minimum = convertSatsToEuro(feeData.minimumFee * 140, eurFiatPrice) || '?';

  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <TextPaperCell>{t('HighPriority')}</TextPaperCell>
          <TextPaperCell useMonospace={true}>
            {feeData.fastestFee} sat/vB = {fastest.replace('.', ',')} €
          </TextPaperCell>

          <TextPaperCell>{t('MediumPriority')}</TextPaperCell>
          <TextPaperCell useMonospace={true}>
            {feeData.hourFee} sat/vB = {medium.replace('.', ',')} €
          </TextPaperCell>

          <TextPaperCell>{t('NoPriority')}</TextPaperCell>
          <TextPaperCell useMonospace={true}>
            {feeData.minimumFee} sat/vB = {minimum.replace('.', ',')} €
          </TextPaperCell>
        </Grid>
      </Box>
    </Paper>
  );
};

interface TextPaperCellProps {
  useMonospace?: boolean;
  children: React.ReactNode;
}

const TextPaperCell = ({ useMonospace, children }: TextPaperCellProps) => {
  return (
    <Grid size={6}>
      <Paper
        elevation={6}
        sx={{
          padding: 1,
          ...(useMonospace && {
            fontFamily: 'Monospace',
          }),
          textAlign: 'center',
          color: 'text.secondary',
        }}>
        {children}
      </Paper>
    </Grid>
  );
};
