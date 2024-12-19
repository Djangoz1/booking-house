import { RecordModel } from "pocketbase";
import exp from "constants";
import React from "react";

export type TPocketID = string;
export type TStripeID = string;
export type TAuth = {
  id: string;
  email: string;
  status: "done" | "success" | null;
};

export type TAccomodation = "oliviers" | "lavandes" | "spa" | "reception";

export interface IAccomodation {
  images: { title: string; description: string | null; image: string }[];
  title: string;
  plans: {
    name: string;
    price: number;
    arr: {
      done?: boolean;
      icon: string;
      title: string | React.ReactNode;
    }[];
  }[];
}

export interface IPlan extends RecordModel {
  commoditie: TPocketID;
  id: TPocketID;
  name: "Formule Simple" | "Formule Complète";
  price: number;
}

export interface ICommoditie extends RecordModel {
  name: TAccomodation;
}

export interface IReservation extends RecordModel {
  id: TPocketID;
  email: string;
  start_date: string;
  end_date: string;
  locked: boolean;
  // phone: string;
  tx_id: TStripeID;
  plan: TPocketID;
}

export interface ITxStripe {
  amount_total: number;
  commoditie: ICommoditie;
  customer_details: {
    address: any;
    email: string;
    name: string;
    phone: string;
    tax_exempt: "none" | "exempt";
    tax_ids: any[];
  };
  email: string;
  end_date: string;
  line_items: {
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: "eur";
    description: string;
    id: string;
    object: string;
    price: any;
    quantity: number;
  }[];
  metadata: {
    end_date: string;
    start_date: string;
    voyagers: number;
    plan: TPocketID;
  };
  payment_status: "paid" | "unpaid";
  plan: IPlan;
  reservation: IReservation;
  start_date: string;
}
