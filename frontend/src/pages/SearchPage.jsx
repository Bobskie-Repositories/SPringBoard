import React from "react";
import { useAuth } from "../context/AuthContext";
import A_Dashboard from "./A_Dashboard";
import S_Dashboard from "./S_Dashboard";
import M_Dashboard from "./M_Dashboard";

const SearchPage = () => {
  const { role } = useAuth();
  return (
    <div>
      {role === "teacher" && <M_Dashboard choose={5} />}
      {role === "student" && <S_Dashboard choose={3} />}
      {role === "admin" && <A_Dashboard choose={4} />}
    </div>
  );
};

export default SearchPage;
