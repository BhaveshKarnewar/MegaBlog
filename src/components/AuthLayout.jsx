import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // todo make it simple
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading</h1> : <>{children}</>;
}
