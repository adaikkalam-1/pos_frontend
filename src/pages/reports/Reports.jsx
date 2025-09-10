import {
  Avatar,
  Button,
  message,
  Popconfirm,
  Space,
  Switch,
  Table,
} from "antd";
import { useEffect, useRef, useState } from "react";

import { GetSales } from "../../services/Index";
import moment from "moment";
import ViewReports from "./ViewReports";

const Reports = () => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await GetSales();
      const newData = res?.data;
      setData(newData?.map((item) => ({ ...item, key: item.id })));
      setLoading(false);
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Invoice No",
      dataIndex: "invoice_no",
      key: "invoice_no",

      render: (_, item) => (
        <>
          <Space>{item.invoice_no ? item.invoice_no : "-"}</Space>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",

      render: (_, item) => (
        <>
          <Space>
            {item.created_at
              ? moment(item.created_at).format("DD-MM-YYYY")
              : "-"}
          </Space>
        </>
      ),
    },
    {
      title: "Total amount",
      dataIndex: "total_amount",
      key: "total_amount",

      render: (_, item) => (item.total_amount ? item.total_amount : "-"),
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, item) => (
        <Space size="middle">
          <ViewReports data={item} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        bordered={true}
        loading={loading}
        pagination={false}
      />
    </>
  );
};

export default Reports;
