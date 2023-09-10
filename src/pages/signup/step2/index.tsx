import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../../context/ToastContext";
import { postSalon } from "../../../api";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import FileUpload from "../../../components/uploadFile";

const SignupStep2 = () => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  const handleSalonSignup = (
    name: string,
    phone: string,
    address: string,
    description: string | null,
    image: string | null,
    video: string | null,
    map: string | null
  ) => {
    if (name && phone && address && description) {
      postSalon(name, phone, address, description, image, video, map)
        .then((res) => {
          console.log(res);

          // navigate("/");
        })
        .catch((error) => {
          setToastMessage("ثبت سالن با مشکل مواجه شد");
          setMessageType("error");
        });
    } else {
      setToastMessage("اطلاعات را کامل وارد کنید");
      setMessageType("error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "200px", height: "100px", objectFit: "cover" }}
          src="http://cs5.thorhammer.space/497093901067ead06fad3197107281907.svg"
        />

        <Typography component="h1" variant="h5" fontFamily="Vazir">
          ثبت نام سالن
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSalonSignup(
              name,
              phoneNumber,
              address,
              description,
              "",
              "",
              ""
            );
          }}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                fullWidth
                required
                id="name"
                label="نام سالن"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="شماره تلفن"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={6}>
              <Typography component="label" variant="body1">
                آدرس
              </Typography>
              <TextareaAutosize
                required
                id="address"
                style={{ width: "100%" }}
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoFocus
                minRows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography component="label" variant="body1">
                توضیحات
              </Typography>
              <TextareaAutosize
                required
                id="description"
                style={{ width: "100%" }}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
                minRows={4}
              />
            </Grid>

            <Grid item xs={6}>
              <FileUpload />
            </Grid>
            <Grid item xs={6}>
              اپلود ویدیو
            </Grid>
            <Grid item xs={12}>
              نقشه
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%", fontSize: "20px" }}
          >
            ثبت سالن
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupStep2;
