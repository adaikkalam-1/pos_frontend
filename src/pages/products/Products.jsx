import {
  Avatar,
  Button,
  message,
  Popconfirm,
  Space,
  Switch,
  Table,
  App,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct";
import { DeleteProduct, GetProduct } from "../../services/Index";

const Products = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
   const { message } = App.useApp();

  console.log("data", data);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await GetProduct();
      console.log("res", res);

      const newData = res.data;
      setData(newData?.map((item) => ({ ...item, key: item.id })));

      setLoading(false);
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      let res = await DeleteProduct(id);
      message.success(res?.message);
      fetchProduct();
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.error);
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
      title: "Product Name",
      dataIndex: "name",
      key: "name",

      render: (_, item) => (
        <>
          <Space>{item.name ? item.name : "-"}</Space>
        </>
      ),
    },
    {
      title: "Sku",
      dataIndex: "sku",
      key: "sku",

      render: (_, item) => (item.sku ? item.sku : "-"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      render: (_, item) => (item.price ? item.price : "-"),
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock_qty",
      key: "stock_qty",
      render: (_, item) => (item.stock_qty ? item.stock_qty : "-"),
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, item) => (
        <Space size="middle">
          <ViewProduct data={item} />
          <EditProduct data={item} fetchProduct={fetchProduct} />

          <Popconfirm
            title={`Are you sure to delete ${item.name}?`}
            onConfirm={() => handleDelete(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              size="small"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="add-button-head">
        <AddProduct fetchProduct={fetchProduct} />
      </div>
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

export default Products;
