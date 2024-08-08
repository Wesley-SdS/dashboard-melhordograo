import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <div className=" py-5">
      <Sidebar />
    </div>
  );
}
