import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Tag } from "antd";
import { Descriptions } from "antd";
import { useState } from "react";

const ViewProduct = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const items = [
    {
      label: "Product Name",
      children: data?.product_name || "N/A",
    },
    {
      label: "SKU",
      children: data?.sku || "N/A",
    },
    {
      label: "Price",
      children: (
        <>
          <Tag color="lime"> {data?.price || "N/A"} </Tag>
        </>
      ),
    },
    {
      label: "stock quantity",
      children: (
        <>
          <Tag color="lime">{data?.stock_qty || "N/A"}</Tag>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" size="small" onClick={() => setOpen(true)}>
        <EyeOutlined />
      </Button>
      <Drawer
        title="View Product"
        width={"50%"}
        maskClosable={false}
        open={open}
        onClose={handleClose}
      >
        <Card>
          <Descriptions
            // bordered
            column={2}
            items={items}
            // contentStyle={{ paddingBottom: "16px" }}
          />
        </Card>
      </Drawer>
    </div>
  );
};

export default ViewProduct;
