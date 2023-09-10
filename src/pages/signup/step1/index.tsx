import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../../context/ToastContext";
import { postSalonRegister, loggedIn } from "../../../api";
import { useAuth } from "../../../hooks/useAuth";

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

const SignupStep1 = () => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resetPassword, setResetPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = (email: string, userName: string, password: string) => {
    if (password === resetPassword) {
      postSalonRegister(email, userName, password)
        .then((res) => {
          console.log(res);
          loggedIn(res.data.token);
          login(res.data.user, res.data.token);

          navigate("/salon-signup");
        })
        .catch((error) => {
          setToastMessage("ثبت نام سالن با مشکل مواجه شد");
          setMessageType("error");
        });
    } else {
      setToastMessage("رمز عبور و تکرار ان مطابقت ندارد");
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
            handleSignup(email, userName, password);
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
                id="username"
                label="نام کاربری"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="ایمیل"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="رمز عبور"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="تکرار رمز عبور"
                type="password"
                id="repeatPassword"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%", fontSize: "20px" }}
          >
            ثبت نام
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupStep1;
