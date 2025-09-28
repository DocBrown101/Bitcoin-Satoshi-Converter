import React, {useEffect, useState} from "react";
import {NumericFormat} from 'react-number-format';
import {useTranslation} from "react-i18next";

import {Grid, Accordion, Skeleton, AccordionSummary, AccordionDetails, Box, Typography, Container, Paper} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConverterStore from "../stores/ConverterStore";
import calculateHalvingData from '../services/HalvingCalculator';

const formatDate = (date, timeZone, locales) => {
  return (
    new Intl.DateTimeFormat(locales, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    }).format(date)
  );
};

// https://mempool.space/de/docs/api/websocket
export default function MempoolWsComponent({...props}) {
  const wsUrl = "wss://mempool.space/api/v1/ws";
  //const wsUrl = "ws://192.168.0.39:3006/api/v1/ws";

  const [webSocketReady, setWebSocketReady] = useState(false);
  const [lastFeeData, setLastFeeData] = useState();
  const [lastBlockData, setLastBlockData] = useState();
  const [lastTimeAvg, setLastTimeAvg] = useState();

  useEffect(() => {
    const newWebSocket = new WebSocket(wsUrl);

    newWebSocket.onopen = () => {
      setWebSocketReady(true);

      const initialMessages = [
        {action: "init"},
        {
          action: "want",
          data: ["stats", "mempool-blocks", "blocks"],
        },
      ];

      for (const message of initialMessages) {
        newWebSocket.send(JSON.stringify(message));
      }
    };

    newWebSocket.onmessage = (event) => {
      const serverData = JSON.parse(event.data);

      // console.dir(serverData);

      if (serverData.da) {
        setLastTimeAvg(serverData.da.timeAvg);
      }

      if (serverData.fees) {
        setLastFeeData(serverData.fees);
      }

      const lastBlock = serverData.blocks
        ? serverData.blocks.sort((a, b) => b.height - a.height)[0]
        : serverData.block;

      if (lastBlock) {
        setLastBlockData(lastBlock);
      }
    };

    newWebSocket.onclose = () => {
      setWebSocketReady(false);
    };

    newWebSocket.onerror = (err) => {
      console.log('Socket encountered error: ', err.message, 'Closing socket');
      setWebSocketReady(false);
      newWebSocket.close();
    };

    return () => {
      newWebSocket.close();
    };
  }, []);

  const {t} = useTranslation();
  const isLoading = !webSocketReady || !lastFeeData || !lastBlockData;
  const loadingTitle = !webSocketReady ? t("PleaseWait") : "Waiting for message from server ...";
  const normalTitle = "Bitcoin Halving Event";

  return (
    <React.Fragment>
      <Box mb={2}>
        <Container maxWidth="sm">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{isLoading ? loadingTitle : normalTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography mb={2}>{t("HalvingText.line1")}</Typography>
              <Typography mb={2}>{t("HalvingText.line2")}</Typography>
              <Typography>{t("HalvingText.line3")}</Typography>
            </AccordionDetails>
          </Accordion>
          <Paper>
            <HalvingComponent blockData={lastBlockData} timeAvg={lastTimeAvg} isLoading={isLoading} />
          </Paper>
        </Container>
      </Box>
      <Box mb={2}>
        <Container maxWidth="sm">
          <Typography variant="h6">{t("CurrentTransactionFees")}</Typography>
          <CurrentFeesComponent feeData={lastFeeData} isLoading={isLoading} />
        </Container>
      </Box>
    </React.Fragment>
  );
}

const HalvingComponent = ({blockData, timeAvg, isLoading}) => {
  if (isLoading) {
    return (<Skeleton variant="rounded" height={120} />);
  }

  const {t} = useTranslation();
  const halvingData = calculateHalvingData(timeAvg, blockData.height);
  const date = formatDate(halvingData.estimatedDate, t("TimeZone"), t("Locales"));

  return (
    <Box fontFamily="Monospace" fontWeight="fontWeightBold" textAlign="center" p={2}>
      <Typography color="secondary" variant="h6">
        <NumericFormat value={halvingData.blocksToNextHalving}
          displayType={'text'}
          decimalScale={0}
          fixedDecimalScale={true}
          suffix={t("MissingBlocks")}
          thousandSeparator={'.'}
          decimalSeparator={','} />
      </Typography>
      <Typography>{halvingData.estimatedDays} days {halvingData.estimatedHoures} hours {halvingData.estimatedMinutes} minutes</Typography>
      <Typography variant="h6" color="secondary">{date}</Typography>
    </Box >
  );
};

const CurrentFeesComponent = ({feeData, isLoading}) => {
  if (isLoading) {
    return (<Skeleton variant="rounded" height={184} />);
  }

  const eurFiatPrice = ConverterStore((state) => state.eurFiatPrice);
  const fastest = ((feeData.fastestFee * 140 * eurFiatPrice) / 100000000).toFixed(2);
  const medium = ((feeData.hourFee * 140 * eurFiatPrice) / 100000000).toFixed(2);
  const minimum = ((feeData.minimumFee * 140 * eurFiatPrice) / 100000000).toFixed(2);
  const {t} = useTranslation();
  return (
    <Paper>
      <Box fontFamily="Monospace" fontWeight="fontWeightBold" p={2}>
        <Grid container spacing={2}>
          <TextPaperCell>{t("HighPriority")}</TextPaperCell>
          <TextPaperCell>{feeData.fastestFee} sat/vB = {fastest.replace(".", ",")} €</TextPaperCell>

          <TextPaperCell>{t("MediumPriority")}</TextPaperCell>
          <TextPaperCell>{feeData.hourFee} sat/vB = {medium.replace(".", ",")} €</TextPaperCell>

          <TextPaperCell>{t("NoPriority")}</TextPaperCell>
          <TextPaperCell>{feeData.minimumFee} sat/vB = {minimum.replace(".", ",")} €</TextPaperCell>
        </Grid>
      </Box >
    </Paper>
  );
};

const TextPaperCell = ({children}) => {
  return (
    <Grid size={6}>
      <Paper
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
          padding: 1,
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          fontWeight: 400,
          textAlign: 'center',
          color: 'text.secondary',
        }}>
        {children}
      </Paper>
    </Grid>
  );
};
