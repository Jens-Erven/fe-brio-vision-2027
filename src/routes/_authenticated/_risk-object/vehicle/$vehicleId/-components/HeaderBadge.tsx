import * as React from "react";


const HeaderBadge = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <span className=" text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5 text-cyan-800 font-bold">
        <div className="bg-cyan-100 rounded-full p-1 w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
        {value}
      </div>
    </div>
  );
};


export default HeaderBadge;