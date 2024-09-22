import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md bg-black cursor-pointer"
    >
      <div className="bg-[#0e0318] border-[1px] p-3 rounded-xl border-zinc-700 shadow-sm w-[20rem] h-[15rem] flex flex-col">
        <div className="flex gap-5">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              className="w-10 h-10 rounded-full bg-black"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm z-0">
            <span className="font-extrabold">{job?.title}</span>
            <span className="flex font-semibold text-zinc-500">
              {job?.company?.name}
            </span>
          </div>
          <Button
            variant="Primary"
            className="bg-[#373d45] rounded-3xl hover:bg-[#64a4ec] hover:text-[#ecebeb] h-8 w-14 my-1 z-0 text-white"
          >
            View
          </Button>
        </div>
        <div className="z-0 text-zinc-500 w-72 text-start my-2 text-sm max-h-20 overflow-hidden overflow-ellipsis">
          {job?.location || ""}
        </div>
        <div className="z-0 text-zinc-500 w-72 text-start my-2 text-sm max-h-20 overflow-hidden overflow-ellipsis">
          {job?.description}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-green-600 font-bold"} variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
            {job?.salary}LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};


export default LatestJobCards;
