// import { Header } from "@/components/Header";

import { GalleryLayout } from "@/sections/layouts/GalleryLayout";
import React from "react";

export default ({ params }: { params: { item: number } }) => {
  let { item } = params;

  return (
    <>
      <GalleryLayout target={item} />
    </>
  );
};
