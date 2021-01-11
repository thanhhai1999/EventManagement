
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SponsorListView = () => {
  const classes = useStyles();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    RecallEvents()
  }, [])

const RecallEvents = () =>
{
  axios.get('https://event-management-hcmute.herokuapp.com/api/tickets')
  .then(res => {
    setTickets(res.data.tickets);
  })
  .catch(error => {
    console.log(error)
  })
}
  return (
    <Page
      className={classes.root}
      title="Tickets"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results tickets={tickets} onReload={RecallEvents} />
        </Box>
      </Container>
    </Page>
  );
};

export default SponsorListView;
