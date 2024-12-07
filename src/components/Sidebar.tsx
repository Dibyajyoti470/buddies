import React from "react";
import Chats from "@/components/Chats";
import { auth } from "@/firebase";
import { Button } from "@nextui-org/react";
import EllipsisVertical from "@/assets/icons/EllipsisVertical";
import EllipsisHorizontal from "@/assets/icons/EllipsisHorizontal";
import Logo from "@/assets/icons/Logo";
import Search from "@/assets/icons/Search";

export default function Sidebar() {
  return (
    <section className="flex flex-col w-96 border-r-1 border-gray-100">
      <div className="h-20 flex justify-between items-center px-6 border-b-1 border-gray-100">
        <p className="flex items-center gap-3 font-semibold text-primary-500">
          <Logo className="w-6 h-6" />
          <span className="text-base">Buddies</span>
        </p>
        <div className="flex items-center">
          <Button isIconOnly disableRipple variant="light" size="sm">
            <Search className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            isIconOnly
            disableRipple
            variant="light"
            size="sm"
            className="-mr-3"
          >
            <EllipsisHorizontal className="w-4 h-4 fill-gray-600" />
            {/* <EllipsisVertical className="w-4 h-4 fill-gray-600" /> */}
          </Button>
        </div>
      </div>
      <Chats auth={auth} />
    </section>
  );
}
