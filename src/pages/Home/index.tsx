import React, { useContext, useEffect } from "react";
import NavBar from "../../components/navBar";
import { useNavigate } from "react-router-dom";
import { getProfile, getMySalon } from "../../api";
import { useUser } from "../../hooks/useUser";
import { ToastContext } from "../../context/ToastContext";
import OrderTable from "../../components/orderTable";

function Home() {
  const navigate = useNavigate();
  const { addUser } = useUser();
  const { setToastMessage, setMessageType } = useContext(ToastContext);

  useEffect(() => {
    getMySalon()
      .then((res) => {
        if (res.data) {
          if (!res.data.verified) {
            setToastMessage("منتظر تایید از طرف ادمین باشید");
            setMessageType("error");
            navigate("/login");
          }
        } else {
          setToastMessage("اطلاعات سالن را وارد کنید");
          setMessageType("error");
          navigate("/salon-signup");
        }
      })
      .catch((error) => {
        setToastMessage(" دریافت اطلاعات سالن با مشکل مواجه شد");
        setMessageType("error");
      });
  }, []);
  return (
    <NavBar>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <OrderTable />
      </div>
    </NavBar>
  );
}

export default Home;
