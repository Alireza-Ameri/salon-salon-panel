import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../context/ToastContext";
import { postSalon } from "../../api";

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
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import FileUpload from "../../components/uploadFile";
import NavBar from "../../components/navBar";

const SalonService = () => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  const navigate = useNavigate();

  const handleSalonService = () => {};

  return (
    <NavBar>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NavBar />
        <CssBaseline />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" fontFamily="Vazir">
            ثبت سرویس سالن
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="تاریخ سرویس"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <InputLabel id="demo-simple-select-label">نوع سرویس</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ width: "100%" }}
                  value={age}
                  label="نوع سرویس"
                  title="نوع سرویس"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>کوتاهی مو</MenuItem>
                  <MenuItem value={20}>رنگ کردن مو</MenuItem>
                  <MenuItem value={30}>کراتین مو</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="قیمت"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={1}
                  style={{ marginTop: "5px", width: "100%" }}
                >
                  <Grid item xs={2}>
                    <Box
                      style={{
                        width: "100%",
                        border: "1px solid gray",
                        textAlign: "center",
                        borderRadius: "20px",
                        fontSize: "15px",
                      }}
                    >
                      8-10
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      style={{
                        width: "100%",
                        border: "1px solid gray",
                        textAlign: "center",
                        borderRadius: "20px",
                        fontSize: "15px",
                      }}
                    >
                      10-12
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      style={{
                        width: "100%",
                        border: "1px solid gray",
                        textAlign: "center",
                        borderRadius: "20px",
                        fontSize: "15px",
                      }}
                    >
                      12-14
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      style={{
                        width: "100%",
                        border: "1px solid gray",
                        textAlign: "center",
                        borderRadius: "20px",
                        fontSize: "15px",
                      }}
                    >
                      14-16
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      style={{
                        width: "100%",
                        border: "1px solid gray",
                        textAlign: "center",
                        borderRadius: "20px",
                        fontSize: "15px",
                      }}
                    >
                      16-18
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "50%", fontSize: "20px" }}
            >
              ثبت سرویس سالن
            </Button>
          </Box>
        </Box>
      </Box>
    </NavBar>
  );
};

export default SalonService;
