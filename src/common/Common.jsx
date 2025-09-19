import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/themeSlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, App } from "antd";

const Common = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const isLayoutCollapsed = useSelector(
    (state) => state.theme.isLayoutCollapsed
  );

  const LogoutModal = () => {
    modal.confirm({
      title: "Do you want to Logout?",
      icon: <ExclamationCircleOutlined />,
      content:
        "When clicked the OK button, you will be redirected to the login page",
      onOk() {
        dispatch(logout());
        navigate("/login");
      },
    });
  };

  return {
    dispatch,
    navigate,
    isLayoutCollapsed,
    LogoutModal,
  };
};

export default Common;
