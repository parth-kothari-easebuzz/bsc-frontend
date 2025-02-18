import React from "react";
import { Layout, Menu } from "antd";
import UploadCsv from "../bhavCopyComponents/UploadCsv";

const { Header } = Layout;

const Navbar = ({ getData }) => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <h1 style={{ color: "white", margin: 0 }}>BSC-Bhav Copy</h1>
      <div
        style={{
          position: "absolute",
          right: "20px",
        }}
      >
        <UploadCsv getData={getData} />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default Navbar;
