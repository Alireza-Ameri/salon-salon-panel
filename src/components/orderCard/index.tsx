import React, { FC, useContext, useEffect, useState } from "react";

import {
  Box,
  CssBaseline,
  TextField,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";

import {} from "../../api";
import { ToastContext } from "../../context/ToastContext";

interface IProps {}

const OrderCard: FC<IProps> = ({}) => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  return (
    <Box style={{ width: "100%" }}>
      <CssBaseline />
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="http://cs5.thorhammer.space/f3635108bfb59c217c629924bb12d93a1.jpg"
          title="cutHair"
        />
        <CardContent>
          <Typography variant="h5" component="span">
            کوتاه کردن مو
          </Typography>
          <Grid container spacing={1} style={{marginTop:'5px', width:'100%'}}>
            <Grid item xs={3}>
              <Box
                style={{
                  width: "100%",
                  border: "1px solid gray",
                  textAlign: "center",
                  borderRadius: "20px",
                  fontSize: "15px",
                  backgroundColor: "lightblue",
                }}
              >
                8-10
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                style={{
                  width: "100%",
                  border: "1px solid gray",
                  textAlign: "center",
                  borderRadius: "20px",
                  fontSize: "15px",
                  backgroundColor: "lightblue",
                }}
              >
                10-12
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                style={{
                  width: "100%",
                  border: "1px solid gray",
                  textAlign: "center",
                  borderRadius: "20px",
                  fontSize: "15px",
                  backgroundColor: "lightblue",
                }}
              >
                12-14
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                style={{
                  width: "100%",
                  border: "1px solid gray",
                  textAlign: "center",
                  borderRadius: "20px",
                  fontSize: "15px",
                  backgroundColor: "lightblue",
                }}
              >
                14-16
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                style={{
                  width: "100%",
                  border: "1px solid gray",
                  textAlign: "center",
                  borderRadius: "20px",
                  fontSize: "15px",
                  backgroundColor: "lightblue",
                }}
              >
               16-18
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary" style={{marginTop:'10px'}}>
            20000 تومان
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderCard;
