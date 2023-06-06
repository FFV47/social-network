/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

import ToastMessage from "../components/ToastMessage";
import ScrollToTop from "../components/ScrollToTop";

const DataContext = createContext({});

export const DataProvider = () => {
  const userInfo = JSON.parse(document.getElementById("userInfo").textContent);
  const authenticated = userInfo.auth;

  const params = useParams();
  const urlPage = params.urlPage ? parseInt(params.urlPage, 10) : 1;
  const loggedUser = userInfo.username;

  const [toastText, setToastText] = useState("");

  const path = window.location.pathname;
  const queryKey = getQueryKey(path, params.username, urlPage);

  return (
    <DataContext.Provider value={{ urlPage, queryKey, loggedUser, authenticated, setToastText }}>
      <ToastMessage toastText={toastText} />
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
    </DataContext.Provider>
  );
};

function getQueryKey(path, urlUsername, urlPage) {
  if (/profile/.test(path)) {
    return ["profile", urlUsername, urlPage];
  } else if (/following/.test(path)) {
    return ["following", urlPage];
  } else {
    return ["posts", urlPage];
  }
}

const useDataContext = () => useContext(DataContext);

export default useDataContext;
