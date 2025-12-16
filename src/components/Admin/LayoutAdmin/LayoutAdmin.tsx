import "./LayoutAdmin.scss";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, type MenuProps } from "antd";
import { FaBook, FaChartBar, FaFileAlt, FaKey, FaUser } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";

const { Header, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem(
    <NavLink to="/admin/dashboard">Thống kê</NavLink>,
    "/admin/dashboard",
    <FaChartBar />
  ),
  getItem(
    <NavLink to="/admin/user">Quản lý người dùng</NavLink>,
    "/admin/user",
    <FaUser />
  ),
  getItem(
    <NavLink to="/admin/role">Quản lý vai trò</NavLink>,
    "/admin/role",
    <FaKey />
  ),
  getItem(
    <NavLink to="/admin/permission">Quản lý chức năng</NavLink>,
    "/admin/permission",
    <IoMdSettings />
  ),
  getItem(
    <NavLink to="/admin/book">Quản lý sách</NavLink>,
    "/admin/book",
    <FaBook />
  ),
  getItem(
    <NavLink to="/admin/category">Quản lý thể loại</NavLink>,
    "/admin/category",
    <BiSolidCategoryAlt />
  ),
  getItem(
    <NavLink to="/admin/order">Quản lý đơn hàng</NavLink>,
    "/admin/order",
    <FaCartShopping />
  ),
  getItem(
    <NavLink to="/admin/post">Quản lý bài viết</NavLink>,
    "/admin/post",
    <FaFileAlt />
  ),
];

const siderStyle: React.CSSProperties = {
  // overflow: "visible",
  overflow: "auto",
  height: "100vh",
  width: "20%",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  // Nếu key đặt là chính URL, ta dùng trực tiếp:
  const selectedKeys = [location.pathname];
  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-container">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={siderStyle}
        width={230}
        className="sidebar"
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          className="menu"
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="header"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="logo-container">
            <FaBook className="logo" />
            <span>AnBook</span>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 0,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
