import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Row,
  Col,
  message,
  Switch,
} from "antd";
import { useState } from "react";
import { CreateProduct } from "../../services/Index";

const AddProduct = ({ fetchProduct }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = async (data) => {
    setLoading(true);
    try {
      let response = await CreateProduct(data);
      console.log("response", response);

      message.success("Product created successfully");

      form.resetFields();
      setOpen(false);
      fetchProduct();
      setLoading(false);
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
      setLoading(false);

      // message.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        className="add_button"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Add Product
      </Button>
      <Drawer title="Add Product" onClose={onClose} open={open} width={"50%"}>
        <Form
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Product Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter The product name !",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter the product name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Sku"
                name="sku"
                rules={[
                  {
                    required: true,
                    message: "Please Enter sku / code !",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter the sku" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Prouct price ",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter tha valid Price",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter the product price" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Stock Quantity"
                name="stock_qty"
                rules={[
                  {
                    required: true,
                    message: "Please Enter stock quantity !",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid stock quantity",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter the stock quantity" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className="save_button" style={{ marginTop: "30px" }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AddProduct;
