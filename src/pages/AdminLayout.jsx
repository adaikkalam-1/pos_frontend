import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { menuItems } from "../common/MenuItems";
import Common from "../common/Common";
import pos_logo from "../assets/pos_logo.png";
import { setLayoutCollapsed } from "../store/themeSlice";
import { useSelector } from "react-redux";
const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const { navigate, dispatch ,LogoutModal} =  Common();
  const location = useLocation();
  const collapsed = useSelector((state) => state.theme.layoutCollapsed);
  const [selectedMenu, setSelectedMenu] = useState(location.pathname);

  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    if (e.key === "/logout") {
      console.log("modal click")
      LogoutModal()
    } else {
      setSelectedMenu(e.key);
      navigate(e.key);
    }
  };

  const handleCollapse = (value) => {
    dispatch(setLayoutCollapsed(value));
  };

  return (
    <Layout className="adminLayout_main">
      <Header className="adminLayout_header">
        <div className="logo-container">
          <img src={pos_logo} alt="POS Logo" className="logo-img" />
          {/* <h2 className="logo-text">POS Solutions</h2> */}
        </div>
      </Header>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          className="adminLayout_sider"
        >
          <Menu
            mode="inline"
            className="adminLayout_menu"
            selectedKeys={[selectedMenu]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        <Content>
          <div
            className="adminLayout_content"
            style={{
              background: "#fff",
              padding: "24px",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
