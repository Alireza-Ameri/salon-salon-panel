import React, { FC, useContext, useEffect, useState } from "react";

import { Box, CssBaseline, TextField, Typography, Grid } from "@mui/material";

import {} from "../../api";
import { ToastContext } from "../../context/ToastContext";
import OrderCard from "../orderCard";

interface IProps {}

const OrderTable: FC<IProps> = ({}) => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        textAlign:'center'
      }}
    >
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <OrderCard />
        </Grid>
        <Grid item xs={4}>
          <OrderCard />
        </Grid>
        <Grid item xs={4}>
          <OrderCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderTable;