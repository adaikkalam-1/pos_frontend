import { EditOutlined, SaveOutlined } from "@ant-design/icons";
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
import { useEffect } from "react";
import { useState } from "react";
import { UpdateProduct } from "../../services/Index";

const EditProduct = ({ data, fetchProduct }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data && open) {
      form.setFieldsValue({
        name: data.name,
        sku: data.sku,
        price: data.price,
        stock_qty: data.stock_qty,
      });
    }
  }, [data, open]);

  const onFinish = (values) => {
    setLoading(true);
    UpdateProduct(data.id, values)
      .then((response) => {
          message.success(response.message);
          form.resetFields();
          setOpen(false);
          fetchProduct();
          setLoading(false);
        
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        size="small"
        type="primary"
        className="edit_button"
        icon={<EditOutlined />}
        onClick={showDrawer}
      />
      <Drawer
        width={"50%"}
        open={open}
        onClose={onClose}
        title="Edit Product "
        maskClosable={false}
      >
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

export default EditProduct;
