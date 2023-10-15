import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";
import {useTranslation} from "react-i18next";

import {Box, Typography, Container, Paper, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';

import ConverterStore from "../stores/ConverterStore";
import calculateHalvingData from '../services/HalvingCalculator';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

  if (!webSocketReady) {
    return <PlaceholderComponent text="Please wait ..." />;
  } else if (!lastFeeData || !lastBlockData) {
    return <PlaceholderComponent text="Waiting for message from server ..." />;
  } else {
    return (
      <React.Fragment>
        <HalvingComponent blockData={lastBlockData} timeAvg={lastTimeAvg} />
        <CurrentFeesComponent feeData={lastFeeData} />
      </React.Fragment>
    );
  }
}

const PlaceholderComponent = React.memo((props) => {
  return (
    <Box mb={2}>
      <Container maxWidth="sm">
        <Typography variant="h6">{props.text}</Typography>
        <Paper>
          <Box sx={{height: 352}} />
        </Paper>
      </Container>
    </Box>
  );
});

const HalvingComponent = React.memo((props) => {
  const {t} = useTranslation();

  const halvingData = calculateHalvingData(props.timeAvg, props.blockData.height);
  const date = formatDate(halvingData.estimatedDate, t("TimeZone"), t("Locales"));

  return (
    <Box mb={2}>
      <Container maxWidth="sm">
        <Typography variant="h6">Bitcoin Halving Event</Typography>
        <Paper>
          <Box fontFamily="Monospace" fontWeight="fontWeightBold" textAlign="center" p={2}>
            <Typography color="secondary" variant="h6">
              <NumberFormat value={halvingData.blocksToNextHalving}
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
        </Paper>
      </Container>
    </Box>
  );
});

const CurrentFeesComponent = React.memo((props) => {
  const eurFiatPrice = ConverterStore((state) => state.eurFiatPrice);
  const fastest = ((props.feeData.fastestFee * 140 * eurFiatPrice) / 100000000).toFixed(2);
  const medium = ((props.feeData.hourFee * 140 * eurFiatPrice) / 100000000).toFixed(2);
  const minimum = ((props.feeData.minimumFee * 140 * eurFiatPrice) / 100000000).toFixed(2);
  const {t} = useTranslation();
  return (
    <Box mb={2}>
      <Container maxWidth="sm">
        <Typography variant="h6">{t("CurrentTransactionFees")}</Typography>
        <Paper>
          <Box fontFamily="Monospace" fontWeight="fontWeightBold" p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item>{t("HighPriority")}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{props.feeData.fastestFee} sat/vB = {fastest.replace(".", ",")} €</Item>
              </Grid>

              <Grid item xs={6}>
                <Item>{t("MediumPriority")}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{props.feeData.hourFee} sat/vB = {medium.replace(".", ",")} €</Item>
              </Grid>

              <Grid item xs={6}>
                <Item>{t("NoPriority")}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{props.feeData.minimumFee} sat/vB = {minimum.replace(".", ",")} €</Item>
              </Grid>
            </Grid>
          </Box >
        </Paper>
      </Container>
    </Box>
  );
});
