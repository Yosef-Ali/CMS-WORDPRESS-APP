import Image from "next/image";
import {
  EmailIcon,
  LocationIcon,
  MassIcon,
  PhoneIcon,
  TimeIcon,
} from "./icons";

import PriestIcon from "../public/priest.png";

export function Mass(props) {
  const { mass, weekDays, sunDay } = props.parishs;
  return (
    <div className="mb-10 flex flex-col lg:items-start">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/10 text-black/70">
        <MassIcon />
      </div>
      <div className="flex-grow">
        <h2 className="title-font mb-3 text-lg font-medium text-gray-900">
          <span className="mr-4">Mass:</span>
          {mass}
        </h2>
        <div className="flex">
          <div className="mb-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
            <TimeIcon />
          </div>

          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Week Days: </span>
            {weekDays}
          </span>
        </div>

        <div className="flex">
          <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
            <TimeIcon />
          </div>
          <span className="ml-2 text-base leading-relaxed">
            <span className="font-semibold">Sun Day: </span>
            {sunDay}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ParishContact(props) {
  const { parishAddress, parishPhone, parishPobox } = props.parishs;
  return (
    <div className="mb-10 flex flex-col lg:items-start">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/10 text-black/70">
        <LocationIcon />
      </div>
      <div className="flex-grow">
        <h2 className="title-font mb-3 text-lg font-medium text-gray-900">
          <span className="mr-4">Address:</span>
          {parishAddress}
        </h2>
        <div className="flex">
          {parishPhone && (
            <>
              <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <span className="ml-2 text-base leading-relaxed">
                {parishPhone}
              </span>
            </>
          )}

          {parishPobox && (
            <div className="ml-4 flex ">
              <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
                <EmailIcon className="h-5 w-5" />
              </div>
              <span className="ml-2 text-base leading-relaxed">
                {parishPobox}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PriestProfile(props) {
  const { priestName, priestEmail, priestPhone } = props.parishs;
  const ImageUrl = props.parishs.priestImage?.localFile;

  return (
    <div className="mt-10 mb-10 flex flex-col lg:items-start">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
        {ImageUrl ? (
          <Image
            width={2000}
            height={1000}
            src={ImageUrl}
            alt={""}
            className="h-12 w-12 rounded-full object-cover object-center"
          />
        ) : (
          <Image
            width={2000}
            height={1000}
            src={PriestIcon}
            alt="Priest icon"
            className="h-12 w-12 rounded-full "
          />
        )}
      </div>
      <div className="flex-grow">
        <h2 className="title-font mb-3 text-lg font-medium text-gray-900">
          {priestName}
        </h2>
        <div className="flex">
          {priestPhone && (
            <>
              <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <span className="ml-2 mr-4 text-base leading-relaxed">
                {priestPhone}
              </span>
            </>
          )}
          {priestEmail && (
            <div className="flex">
              <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
                <EmailIcon className="h-5 w-5" />
              </div>
              <span className="ml-2 text-base leading-relaxed">
                {priestEmail}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
