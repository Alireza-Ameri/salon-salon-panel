import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContext } from "../../context/ToastContext";
import { patchMySalon, getServices, getMySalon } from "../../api";

import {
  Button,
  CssBaseline,
  TextField,
  InputLabel,
  Box,
  Typography,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { IService } from "../../types/salon";

import FileUpload from "../../components/uploadFile";
import NavBar from "../../components/navBar";
import Map from "../../components/map/map";

const SalonService = () => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [services, setServices] = useState<number[]>([]);
  const [workingHours, setWorkingHours] = useState<any[]>([]);
  const [servicesData, setServicesData] = useState<IService[]>([]);

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setServices(typeof value === "string" ? value.split(",") : value);
  };

  const handleSalonSignup = (
    name: string,
    phone: string,
    address: string,
    description: string | null,
    image: string | null,
    video: string | null,
    map: string | null,
    workingHours: string[],
    serviceIds: number[]
  ) => {
    if (name && phone && address && description) {
      patchMySalon(
        name,
        phone,
        address,
        description,
        image,
        video,
        map,
        workingHours,
        serviceIds
      )
        .then((res) => {
          setToastMessage("ثبت اطلاعات سالن با موفقیت انجام شد");
          setMessageType("success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
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

  useEffect(() => {
    getServices()
      .then((res) => {
        setServicesData(res.data.services);
      })
      .catch((error) => {
        setToastMessage(" دریافت سرویس ها با مشکل مواجه شد");
        setMessageType("error");
      });

    getMySalon()
      .then((res) => {
        setName(res.data.name);
        setPhoneNumber(res.data.phone);
        setAddress(res.data.address);
        setDescription(res.data.description as string);
        setImage(res.data.image as string);
        setVideoLink(res.data.video as string);
        setWorkingHours(res.data.workingHours);
        const servicesIds = res.data.services.map((item) => item.id);
        setServices(servicesIds);
        const location = res.data.map?.split(",");
        setLat(location[0] as string);
        setLng(location[1] as string);
      })
      .catch((error) => {
        setToastMessage(" دریافت اطلاعات سالن با مشکل مواجه شد");
        setMessageType("error");
      });
  }, []);

  console.log('lat:' , lat)
  console.log('lng:' , lng)

  return (
    <NavBar>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "80%",
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

            <Typography component="h1" variant="h5" fontFamily="Vazir">
              ثبت سالن
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
                  image,
                  videoLink,
                  `${lat},${lng}`,
                  workingHours,
                  services
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
                  <Typography
                    component="label"
                    variant="body1"
                    marginBottom={5}
                  >
                    آپلود عکس
                  </Typography>
                  <FileUpload
                    imageUrl={image}
                    setImageUrl={setImage}
                    altName="salon Image"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="videoLink"
                    label="لینک ویدیو"
                    name="videoLink"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    component="label"
                    variant="body1"
                    marginBottom={5}
                  >
                    لوکیشن ارایشگاه
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Map
                     lat={lat}
                     setlat={setLat}
                     lng={lng}
                     setlng={setLng}
                     />
                  </Box>
                </Grid>
                <Grid item xs={4} marginTop={2}>
                  <InputLabel id="demo-simple-select-label">
                    نوع سرویس
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    style={{ width: "100%" }}
                    value={services}
                    label="سرویس ها"
                    title="سرویس ها"
                    onChange={handleChange}
                  >
                    {servicesData.map((item: IService) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Typography component="label" variant="body1">
                  ساعت های قابل ارائه سرویس
                </Typography>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={1}
                    style={{ marginTop: "5px", width: "100%" }}
                  >
                    <Grid item xs={2}>
                      <Box
                        style={{
                          width: "60%",
                          height: "30px",
                          border: "1px solid gray",
                          textAlign: "center",
                          borderRadius: "20px",
                          fontSize: "15px",
                          backgroundColor: workingHours.includes("EIGHT")
                            ? "lightblue"
                            : "white",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (workingHours.includes("EIGHT")) {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours = newWorkingHours.filter(
                              (item: any) => item !== "EIGHT"
                            );

                            setWorkingHours(newWorkingHours);
                          } else {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours.push("EIGHT");
                            setWorkingHours(newWorkingHours);
                          }
                        }}
                      >
                        8-10
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box
                        style={{
                          width: "60%",
                          height: "30px",
                          border: "1px solid gray",
                          textAlign: "center",
                          borderRadius: "20px",
                          fontSize: "15px",
                          backgroundColor: workingHours.includes("TEN")
                            ? "lightblue"
                            : "white",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (workingHours.includes("TEN")) {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours = newWorkingHours.filter(
                              (item: any) => item !== "TEN"
                            );
                            setWorkingHours(newWorkingHours);
                          } else {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours.push("TEN");
                            setWorkingHours(newWorkingHours);
                          }
                        }}
                      >
                        10-12
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box
                        style={{
                          width: "60%",
                          height: "30px",
                          border: "1px solid gray",
                          textAlign: "center",
                          borderRadius: "20px",
                          fontSize: "15px",
                          backgroundColor: workingHours.includes("TWELEWE")
                            ? "lightblue"
                            : "white",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (workingHours.includes("TWELEWE")) {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours = newWorkingHours.filter(
                              (item: any) => item !== "TWELEWE"
                            );
                            setWorkingHours(newWorkingHours);
                          } else {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours.push("TWELEWE");
                            setWorkingHours(newWorkingHours);
                          }
                        }}
                      >
                        12-14
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box
                        style={{
                          width: "60%",
                          height: "30px",
                          border: "1px solid gray",
                          textAlign: "center",
                          borderRadius: "20px",
                          fontSize: "15px",
                          backgroundColor: workingHours.includes("FOURTEEN")
                            ? "lightblue"
                            : "white",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (workingHours.includes("FOURTEEN")) {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours = newWorkingHours.filter(
                              (item: any) => item !== "FOURTEEN"
                            );

                            setWorkingHours(newWorkingHours);
                          } else {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours.push("FOURTEEN");
                            setWorkingHours(newWorkingHours);
                          }
                        }}
                      >
                        14-16
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box
                        style={{
                          width: "60%",
                          height: "30px",
                          border: "1px solid gray",
                          textAlign: "center",
                          borderRadius: "20px",
                          fontSize: "15px",
                          backgroundColor: workingHours.includes("SIXTEEN")
                            ? "lightblue"
                            : "white",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (workingHours.includes("SIXTEEN")) {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours = newWorkingHours.filter(
                              (item: any) => item !== "SIXTEEN"
                            );

                            setWorkingHours(newWorkingHours);
                          } else {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours.push("SIXTEEN");
                            setWorkingHours(newWorkingHours);
                          }
                        }}
                      >
                        16-18
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box
                        style={{
                          width: "60%",
                          height: "30px",
                          border: "1px solid gray",
                          textAlign: "center",
                          borderRadius: "20px",
                          fontSize: "15px",
                          backgroundColor: workingHours.includes("EIGHTEEN")
                            ? "lightblue"
                            : "white",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (workingHours.includes("EIGHTEEN")) {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours = newWorkingHours.filter(
                              (item: any) => item !== "EIGHTEEN"
                            );

                            setWorkingHours(newWorkingHours);
                          } else {
                            let newWorkingHours = [...workingHours];
                            newWorkingHours.push("EIGHTEEN");
                            setWorkingHours(newWorkingHours);
                          }
                        }}
                      >
                        18-20
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
                ثبت سالن
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </NavBar>
  );
};

export default SalonService;
