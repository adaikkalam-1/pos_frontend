import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Table, Tag } from "antd";
import { Descriptions } from "antd";
import moment from "moment";
import { useState } from "react";

const ViewReports = ({ data }) => {
  const [open, setOpen] = useState(false);
  console.log("data in view report", data);

  const handleClose = () => {
    setOpen(false);
  };

  const items = [
    {
      label: "Invoice Number",
      children: data?.invoice_no || "N/A",
    },
    {
      label: "Date",
      children: moment(data?.created_at).format("DD-MM-YYYY") || "N/A",
    },
    {
      label: "Total Amount",
      children: (
        <>
          <Tag color="lime"> {data?.total_amount || "N/A"} </Tag>
        </>
      ),
    },
    {
      label: "Number of Products",
      children: (
        <>
          <Tag color="lime">{data?.items?.length || "N/A"}</Tag>
        </>
      ),
    },
  ];
  const columns = [
    // {
    //   title: "#",
    //   dataIndex: "index",
    //   align: "center",
    //   render: (text, record, index) => index + 1,
    // },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (product_name) => <span>{product_name}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => <Tag color="blue">{qty}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <Tag color="green">₹{price}</Tag>,
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_, record) => <Tag color="orange">₹{record?.line_total}</Tag>,
    },
  ];

  return (
    <div>
      <Button type="primary" size="small" onClick={() => setOpen(true)}>
        <EyeOutlined />
      </Button>
      <Drawer
        title="View Reports"
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
        <Card title="Product Details" style={{ marginTop: 16 }}>
          <Table
            dataSource={data?.items || []}
            columns={columns}
            pagination={false}
            rowKey={(record, idx) => idx}
            summary={(pageData) => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3} align="right">
                    <strong>Grand Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <Tag color="lime">₹{data?.total_amount}</Tag>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </Card>
      </Drawer>
    </div>
  );
};

export default ViewReports;
