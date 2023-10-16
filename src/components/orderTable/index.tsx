import React, { FC, useContext, useEffect, useState } from "react";

import {
  Box,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

import {} from "../../api";
import { ToastContext } from "../../context/ToastContext";
import { SearchOutlined, CloseOutlined } from "@mui/icons-material";

interface IProps {}

const OrderTable: FC<IProps> = ({}) => {
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  const [count, setCount] = useState<number>(0);
  const [pg, setpg] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");

  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearch(event.target.value);
  };
  const handleClick = (): void => {
    setSearch("");
    setShowClearIcon("none");
  };

  // function handleChangePage(event: any, newpage: any) {
  //   setpg(newpage);
  //   getUsers(newpage * limit, limit, search)
  //     .then((res) => {
  //       setUsers(res.data.users);
  //       setCount(res.data.count);
  //     })
  //     .catch((error) => {
  //       setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
  //       setMessageType("error");
  //     });
  // }

  // function handleChangeRowsPerPage(event: any) {
  //   setLimit(parseInt(event.target.value, 10));
  //   setpg(0);

  //   getUsers(0 * event.target.value, event.target.value, search)
  //     .then((res) => {
  //       setUsers(res.data.users);
  //       setCount(res.data.count);
  //     })
  //     .catch((error) => {
  //       setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
  //       setMessageType("error");
  //     });
  // }

  // useEffect(() => {
  //   getUsers(pg * limit, limit, search)
  //     .then((res) => {
  //       setUsers(res.data.users);
  //       setCount(res.data.count);
  //     })
  //     .catch((error) => {
  //       setToastMessage("دریافت اطلاعات کاربران با مشکل روبرو شد");
  //       setMessageType("error");
  //     });
  // }, [search]);

  return (
    <Box
      style={{
        width: "80%",
        marginBottom: "30px",
      }}
    >
      <CssBaseline />
      <Paper style={{ width: "100%", padding: "10px" }}>
        <h2 style={{ textAlign: "center" }}>اطلاعات سفارشات</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>نام کاربر</TableCell>
                <TableCell>سرویس درخواستی</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell>ساعت</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>
                  <TextField
                    style={{ width: "80%" }}
                    size="small"
                    variant="outlined"
                    value={search}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ display: showClearIcon, cursor: "pointer" }}
                          onClick={handleClick}
                        >
                          <CloseOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>sara</TableCell>
                <TableCell>کوتاه مو</TableCell>
                <TableCell>۱۴۰۲/۷/۱۰</TableCell>
                <TableCell>۸-۱۰</TableCell>
                <TableCell style={{ color: "#007820" }}>رزرو شده</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>maryam</TableCell>
                <TableCell>کراتین مو </TableCell>
                <TableCell>۱۴۰۲/۷/۱۱</TableCell>
                <TableCell>۱۴-۱۶</TableCell>
                <TableCell style={{ color: "#007820" }}> رزرو شده</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={limit}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>

    </Box>
  );
};

export default OrderTable;
