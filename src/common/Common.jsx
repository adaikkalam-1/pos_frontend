import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Common = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLayoutCollapsed = useSelector(
    (state) => state.theme.isLayoutCollapsed
  );

  return {
    dispatch,
    navigate,
    isLayoutCollapsed,
  };
};
export default Common;
