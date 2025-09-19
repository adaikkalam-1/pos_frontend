import { useNavigate } from "react-router";
import { Form, Input, Button, Layout, message, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginUser } from "../../services/Index";
import { useState } from "react";
// import logo from "../../assets/pos_logo.png";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../store/themeSlice";

const { Content } = Layout;

const Login = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
   const { message } = App.useApp();


  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await LoginUser(values);
      console.log(res)
      dispatch(setAccessToken(res.data.token));
      navigate("/");
      message.success(res.message);
    } catch (err) {
      console.log(err);
      message.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:"#d8d3d3ff"
        }}
      >
        <div className="login-card">
          <div className="login-header">
          
            <Title level={3} style={{ margin: "1rem", textAlign: "center" }}>
              Login
            </Title>
          </div>
          <Form name="login" form={form} onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              validateTrigger="onBlur"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
       
      </Content>
    </Layout>
  );
};

export default Login;
