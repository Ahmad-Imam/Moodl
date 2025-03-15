import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="text-slate-800 fa-spinner animate-spin text-4xl sm:text-5xl"
      />
    </div>
  );
}
