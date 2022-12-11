import { gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import apolloClient from '../../apollo';

export default function Pool() {
    const PING = gql`
    query getPing {
      getPing {
        message
        status
      }
    }
  `
  // timer start ===============
  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    apolloClient.query({
      query: PING,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
        },
      },
      fetchPolicy: 'network-only',
    });
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000 * 60);
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  // timer end ===============
  return <></>;
}
