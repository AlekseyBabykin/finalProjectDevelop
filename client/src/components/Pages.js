import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);

  const pages = [];
  for (let i = 0; i <= pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {" "}
      {pages.map((el) => (
        <Pagination.Item
          key={el}
          active={device.page === el}
          onClick={() => device.setPage(el)}
        >
          {el}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
