import React from "react";

const TableRow = ({ children }:any) => {
  return (
    <tr className="bg-white border-b h-[66px]">{children}</tr>
  );
};

const TableHead = ({ children }:any) => {
  return (
    <thead className="text-xs text-gray-700 capitalize bg-[#F8FBFB] border-b-2 border-t-2  border-[#e0e3ed] h-[50px]">
      <tr >{children}</tr>
    </thead>
  );
};

export { TableRow, TableHead };
