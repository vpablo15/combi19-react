import React from "react";
import { UserContext } from "./context/UserContext.js";
import { AppRouter } from "./routers/AppRouter.js";

export const Combi19App = () => {
  const user = {
    mail: "combi19@admin.com",
    password: "admin",
  };

  return (
    <UserContext.Provider value={user}>
      <AppRouter />
    </UserContext.Provider>
  );
};
