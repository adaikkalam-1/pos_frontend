import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  List,
  InputNumber,
  Typography,
  Space,
  Flex,
  Spin,
  App,
  Select,
  Input,
} from "antd";
import { addToCart, clearCart, updateQty } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutProduct, GetProduct } from "../../services/Index";

const { Title, Text } = Typography;
import jsPDF from "jspdf";
import { GenerateInvoice } from "../../components/GenerateInvoice";

const Sale = () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const [filterName, setFilterName] = useState("");
  const cart = useSelector((state) => state.cart.cart);

  const total = cart?.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart?.reduce((sum, item) => sum + item.qty, 0);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, [filterName]);
  const handleChangeValue = (value) => {
    setFilterName(value);
  };
  console.log("filterNAme", filterName);
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await GetProduct(filterName);
      console.log("res", res);

      const newData = res.data;
      setData(newData?.map((item) => ({ ...item, key: item.id })));

      setLoading(false);
    } catch (error) {
      console.log("ee", error.response?.data?.error);
      message.error(error.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };
  console.log("cart", cart);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const payload = {
        items: cart?.map((item) => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price,
          name: item.name,
        })),
      };
      console.log("payload", payload);
      const res = await CheckoutProduct(payload);
      console.log("res", res);
      const newData = res.data;
      message.success(res.message);
      dispatch(clearCart());
      await GenerateInvoice(newData);
      fetchProduct();
    } catch (error) {
      console.log(error);

      console.log("ee", error.response?.data?.error);
      message.error(error.response?.data?.error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="pos-container">
      <Space size="large" align="center">
        <Title level={5}>Search Product</Title>
        <Input
          name="name"
          value={filterName}
          style={{ width: 250 }}
          placeholder="Search  product "
          onChange={(e) => handleChangeValue(e.target.value)}
        />
      </Space>
      {loading ? (
        <div className="loading_container">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <Row gutter={24}>
          <Col xs={24} md={14}>
            <Title level={3} className="section-title">
              Sales Products
            </Title>
            <Row gutter={[16, 16]}>
              {data?.map((p) => (
                <Col xs={24} sm={12} key={p.id}>
                  <Card className="product-card">
                    <div className="product-info">
                      <h3>{p.name}</h3>
                      <Text type="secondary">SKU: {p.sku}</Text>
                      <p className="price">${p.price}</p>
                    </div>
                    <Flex
                      justify="space-between"
                      gap="16px"
                      style={{ alignItems: "center", width: "100%" }}
                    >
                      {p?.stock_qty === 0 ? (
                        <Text type="danger">Out of Stock</Text>
                      ) : (
                        <Text>{p?.stock_qty} left</Text>
                      )}
                      {p?.stock_qty >= 1 && (
                        <Button
                          type="primary"
                          shape="round"
                          className="checkout-btn"
                          onClick={() => dispatch(addToCart(p))}
                        >
                          Add
                        </Button>
                      )}
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col xs={24} md={10}>
            <Card className="cart-card">
              <Title level={3} className="section-title">
                Shopping Cart ({totalQty} items)
              </Title>
              {cart.length === 0 ? (
                <Text type="secondary">No items added.</Text>
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={cart}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Button
                            onClick={() =>
                              dispatch(
                                updateQty({ id: item.id, qty: item.qty - 1 })
                              )
                            }
                          >
                            -
                          </Button>
                          <Text>{item.qty}</Text>
                          <Button
                            onClick={() =>
                              dispatch(
                                updateQty({ id: item.id, qty: item.qty + 1 })
                              )
                            }
                          >
                            +
                          </Button>
                        </div>,
                      ]}
                    >
                      <List.Item.Meta
                        title={<Text strong>{item.name}</Text>}
                        description={
                          <Text className="price">
                            ${item.price.toFixed(2)}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}

              <div className="cart-total">
                <Text strong>Total:</Text>
                <Text className="total-price">${total.toFixed(2)}</Text>
              </div>

              <Button
                size="large"
                block
                className="checkout-btn"
                disabled={cart.length === 0}
                onClick={handleCheckout}
                loading={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Complete Sale"}
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default Sale;
