import { Dayjs } from "dayjs";
import { ICommoditie, IPlan, IReservation, TAuth } from "./data";
export type TPathNextAPI = "/booking" | "/checkout";

export interface ICtxState {
  status: "idle" | "loading" | "success" | "error";
  auth: TAuth | null;
  data: ICtxData["booking"] | {};
  form: any;
  ux: any;
  error: string | null;
  alert: {
    type: "success" | "error" | "warning" | "info" | null;
    message: string | null;
  };
}

export type TTargetDataCtx = "reservations" | "user";
export type TTargetCtx = "home" | "reservations" | "checkout";
export type TUxKit = {
  drawer: boolean;
  modal: boolean;
  alert: boolean;
};

export interface ICtxTools {
  state: ICtxState;

  uxKit: ({ target, value }: { target: keyof TUxKit; value: any }) => void;
  formKit: ({
    target,
    value,
    pack,
  }: {
    target?: string;
    value?: any;
    pack?: Record<string, any>;
  }) => void;
  cleanForm: () => void;
  setAlert: ({
    type,
    message,
  }: {
    type: ICtxState["alert"]["type"];
    message: ICtxState["alert"]["message"];
  }) => void;
  login: ({ password, email }: { password: string; email: string }) => void;
}

export interface IBookingFormState {
  plan: 0 | 1;
  start: Dayjs;
  end: Dayjs | null;
  phone: string;
  voyagers: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ICtxData {
  booking: {
    commoditie: ICommoditie;
    plans: IPlan[];
    reservations: IReservation[];
  };
}
