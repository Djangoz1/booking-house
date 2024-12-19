"use client";

// import { api } from "@/utils/pb";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

import PocketBase from "pocketbase";
import {
  ICtxState,
  ICtxTools,
  TTargetCtx,
  TTargetDataCtx,
  TUxKit,
} from "@/interfaces/ctx";
import { TAuth, TPocketID } from "@/interfaces/data";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./app";

export const urlPocket = process.env.NEXT_PUBLIC_POCKET_URL || "";
export const pb = new PocketBase(urlPocket);

// Mise en place du reducer auth

// Création des context pour state & dispatch
export const ToolsContext = createContext<ICtxTools | undefined>(undefined);

const initialState: ICtxState = {
  status: "idle",
  auth: null,
  data: {},
  form: {
    accomodation: null,
  },
  ux: {},
  alert: {
    type: null,
    message: null,
  },

  error: null,
};

const doLogin = async ({
  dispatch,
  password,
  email,
}: {
  dispatch: any;
  password: string;
  email: string;
}) => {
  dispatch({ type: "LOGIN_START" });

  if (!email || !password) {
    throw new Error("🛑 No auth argument found");
  }

  try {
    const user = await pb.collection("users").authWithPassword(email, password);

    dispatch({ target: "login", type: "LOGIN_SUCCESS", payload: user.record });
    return user;
  } catch (error) {
    dispatch({
      target: "login",
      type: `LOGIN_ERROR`,
      payload: "No account found",
    });
    console.error("Erreur création", error);
  }
};

// Initialisation des contextes avec un état et dispatch typés

// État initial typé

const ToolsReducer = (
  state: ICtxTools["state"],
  action: {
    target: TTargetCtx | keyof TUxKit | string;
    message?: ICtxState["alert"]["message"];
    type: string;
    error?: string;
    payload?: any;
    caches?: TTargetDataCtx[];
  }
): ICtxTools["state"] => {
  console.log({ action });

  switch (action.type) {
    case "LOGIN_START":
      return { ...state, status: "loading" };

    case "LOGIN_SUCCESS":
      return { ...state, auth: { ...action.payload, status: "auth" } };

    case "LOGIN_ERROR":
      return { ...state, auth: { ...state.auth, status: "done" } as TAuth };
    case `FETCH_${action.target.toUpperCase()}_START`:
      // Gérer le début du fetch
      return { ...state, status: "loading" };
    case `FETCH_${action.target.toUpperCase()}_SUCCESS`:
      // Mettre à jour l'état avec les données fetchées
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        status: "success",
      };
    case `FETCH_${action.target.toUpperCase()}_FAILURE`:
      // Gérer une erreur de fetch
      return {
        ...state,
        status: "error",
        alert: { type: "error", message: `Error ${action.target}` },
        error: `${action.target}  ${action.error}`,
      };
    case `ALERT_${
      action?.payload?.type ? action?.payload?.type.toUpperCase() : ""
    }`:
      return {
        ...state,
        alert: {
          type: action.payload.type,
          message: action.message as string | null,
        },
      };
    case `SET_UX_${action.target.toUpperCase()}`:
      return {
        ...state,
        ux: {
          ...state.ux,
          [action.target]: action.payload.value,
        },
      };
    case "CLEAN_FORM":
      return {
        ...state,
        form: {},
      };
    case `SET_FORM_${action?.target ? action.target.toUpperCase() : ""}`:
      if (action.payload.pack) {
        return {
          ...state,
          form: {
            ...state.form,
            ...action.payload.pack,
          },
        };
      } else {
        return {
          ...state,
          form: {
            ...state.form,
            [action.target]: action.payload.value,
          },
        };
      }

    default:
      return state;
  }
};

export const useTools = (): ICtxTools => {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error("useTools must be used within an ToolsProvider");
  }
  return context;
};

const queryClient = new QueryClient();
export const ToolsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ToolsReducer, initialState);

  const login: ICtxTools["login"] = ({ email, password }) =>
    doLogin({ dispatch, email, password });
  const setAlert: ICtxTools["setAlert"] = ({ type = null, message }) =>
    dispatch({
      target: "alert",
      message: message,
      type: `ALERT_${type?.toUpperCase() || ""}`,
      payload: { type },
    });
  const uxKit: ICtxTools["uxKit"] = ({ target, value }) =>
    dispatch({
      target,
      type: `SET_UX_${target.toUpperCase()}`,
      payload: { value },
    });
  const formKit: ICtxTools["formKit"] = ({ target, value, pack }) =>
    dispatch({
      target: target || "",
      type: target ? `SET_FORM_${target.toUpperCase()}` : "SET_FORM_",
      payload: { value, pack },
    });
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ToolsContext.Provider
          value={{
            uxKit,
            state,
            formKit,
            login,
            setAlert,
            cleanForm: () =>
              dispatch({
                target: "form",
                type: "CLEAN_FORM",
                payload: { value: {} },
              }),
          }}
        >
          {children}
        </ToolsContext.Provider>
      </AppProvider>
    </QueryClientProvider>
  );
};

// export const doToolsAuth =
