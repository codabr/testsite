import React from "react";
import Link from "next/link";
import Button from "../button/button.component";

export const AllWorksCard = () => {
  return (
    <div className="animate-slideUp min-h-[300px] w-full flex justify-center text-white items-center">
      <Link
        href="/portfolio"
        className="mx-auto rounded  border-white border p-3 text-sm focus:outline-none"
      >
        <a>
          <Button
            bgColor="transparent"
            borderColor="#003B5C"
            textColor="#003B5C"
          >
            All Our Works
          </Button>
        </a>
      </Link>
    </div>
  );
};
