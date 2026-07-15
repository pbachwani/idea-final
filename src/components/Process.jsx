import React from "react";
import { CardsStack } from "./ui/CardsStack";
import { process } from "@/data/process";

const Process = () => {
  return (
    <section className="">
      <CardsStack cards={process} />
    </section>
  );
};

export default Process;
