import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../context/ToastContext";
import { postLogin, loggedIn } from "../../api";
import { useAuth } from "../../hooks/useAuth";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    postLogin(email, password)
      .then((res) => {
        if (res.data.user.isStoreOwner) {
          loggedIn(res.data.token);
          login(res.data.user, res.data.token);

          navigate("/");
        } else {
          setToastMessage("ایمیل یا رمز وارد شده اشتباه است");
          setMessageType("error");
        }
      })
      .catch((error) => {
        setToastMessage("ایمیل یا رمز وارد شده اشتباه است");
        setMessageType("error");
      });
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
          style={{ width: "400px", height: "100px", objectFit: "cover" }}
          src="http://cs5.thorhammer.space/497093901067ead06fad3197107281907.svg"
        />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ورود به عنوان ادمین سالن
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email, password);
          }}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            width: "500px",
          }}
        >
          <TextField
            margin="normal"
            required
            id="email"
            label="ایمیل"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="رمز عبور"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href={"/signup"} sx={{ textDecoration: "none" }}>
            ثبت نام
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ورود
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
