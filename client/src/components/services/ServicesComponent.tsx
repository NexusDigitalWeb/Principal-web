import { getServices } from "@/utils/servicesRequest";
import anime from "animejs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import CardsLoader from "../Loaders/CardsLoader";
import GoBackButton from "../buttons/GoBackButton";

export interface Services {
  _id: string;
  title: string;
  description: string;
  photo: string;
}

const handleWaypointToRight = (target: string) => {
  anime({
    targets: target,
    left: 0,
    duration: 2000,
    easing: "easeInOutExpo",
  });
};

const handleWaypointToLeft = (target: string) => {
  anime({
    targets: target,
    right: 8,
    duration: 1500,
    easing: "easeInOutExpo",
  });
};

const ServicesComponent = () => {
  const [services, setServices] = useState<Services[]>([
    { _id: "", description: "", photo: "", title: "" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllServices = async () => {
      const servicesRequest = await getServices();
      setServices(servicesRequest);
      setIsLoading(false);
    };
    getAllServices();
  }, []);

  return (
    <div className="h-full w-full p-2 tablet:flex tablet:flex-col tablet:justify-center tablet:items-center">
      <GoBackButton/>
      <Waypoint onEnter={() => handleWaypointToLeft('.window-animation-button')}/>
      {isLoading
        ? services.map((_, index = 5) => <CardsLoader key={index} />)
        : services?.map((item) => (
            <div
              key={item._id}
              className={`flex flex-col justify-center tablet:justify-evenly items-start tablet:items-center p-7 tablet:p-6 h-full w-full mb-10 border-[#191A23] border-b-4 border rounded-[20px] relative right-[1000px] tablet:h-[320px] tablet:w-[90%] window-animation-${item.title.replace(
                /\s/g,
                ""
              )}`}
            >
              <Waypoint
                onEnter={() =>
                  handleWaypointToRight(
                    `.window-animation-${item.title.replace(/\s/g, "")}`
                  )
                }
              />
              <h3 className="font-bold text-[26px] text-center bg-[#B9FF66] rounded-[20px] border-[#191A23] border-b-2 mb-5 tablet:mb-10 tablet:p-2">
                {item.title}
              </h3>
              <div className="flex justify-between items-end w-full tablet:w-[90%]">
                <div className="flex items-center gap-3">
                <Link href={`/services/${item._id}`}>
                  <Image
                    src={
                      "https://res.cloudinary.com/dcvvyhf8p/image/upload/v1702912190/Principal%20web%20Nexus/zy49eamfjbcelqqvchqr.png"
                    }
                    alt="arrow-learn-more"
                    width={250}
                    height={250}
                    className="w-auto h-auto"
                    layout="responsive"
                  />
                </Link>
                <p className="hidden tablet:flex">Más info.</p>
                </div>
                <div className="w-auto h-auto">
                <Image
                  src={item.photo}
                  width={100}
                  height={100}
                  alt={item.photo}
                  layout="responsive"
                  className="w-auto h-auto"
                />
                </div>
                
              </div>
            </div>
          ))}
    </div>
  );
};

export default ServicesComponent;
