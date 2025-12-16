import { Card, Col, Row, Statistic } from "antd";
import "./Dashboard.scss";
import {
  ArrowDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LuBookText } from "react-icons/lu";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={16}>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tổng người dùng"
              value={100}
              precision={0}
              styles={{ content: { color: "#3f8600" } }}
              prefix={<UserOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tổng sách"
              value={90}
              precision={0}
              styles={{ content: { color: "#cf1322" } }}
              prefix={<LuBookText />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Tổng đơn hàng"
              value={9}
              precision={0}
              styles={{ content: { color: "#cf1322" } }}
              prefix={<ShoppingCartOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Trung bình"
              value={8}
              precision={0}
              styles={{ content: { color: "#cf1322" } }}
              prefix={<ArrowDownOutlined />}
              suffix=""
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
