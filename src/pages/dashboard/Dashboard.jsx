import { App, Card, Col, Row, Spin, Typography ,Empty} from "antd";
import { useEffect, useState } from "react";
import { GetProduct } from "../../services/Index";
const { Text, Title } = Typography;

const Dashboard = () => {
  const [data, setData] = useState();

  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await GetProduct();
      console.log("res", res);
      const newData = res.data;
      setData(newData?.filter((item) => item.stock_qty === 0));
      setLoading(false);
    } catch (error) {
      console.log("ee", error.response?.data?.error);
      message.error(error.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Title level={4} style={{ marginBottom: "10px", color: "#262626" }}>
        Out Of Stock
      </Title>
      {loading ? (
        <div className="loading_container">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : data?.length > 0 ? (
        <Row gutter={[16, 16]}>
          {data?.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={6} xl={6}>
              <Card>
                <div className="product_info">
                  <h3>{item.name}</h3>
                  <Text type="secondary">{item.sku}</Text>
                  <p className="price">$ {item.price}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default Dashboard;
