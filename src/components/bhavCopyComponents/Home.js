import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Space, Input, Spin, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Edit from "./Edit";
import Delete from "./Delete";
import DownloadSearchResult from "./DownloadSearchResult";
import { get_all_records } from "./Modles";
import { showAlert } from "../ApiResponseToasters";
import Navbar from "../navBarComponent/Navbar";
import DownloadBhavCopy from "./DownloadBhavCopy";

const Home = () => {

  //define a state it has state value, a function and a default value 
  // It is render the component every time when the state is changed
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasRecords, setHasRecords] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);


  // Get all the records
  const getData = async () => {
    try {
      setIsLoading(true)
      const response = await get_all_records(currentPage, pageSize, searchQuery);
      const records = response.data.message.data;
      setData(records);
      setTotalRecords(response.data.message.total);
      setHasRecords(records.length > 0);
    } catch (error) {
      // showAlert("", "No record found.");
      setHasRecords(false);
      setData([]);
    } finally {
      setIsLoading(false)

    }
  };

  // It calls whenever the component is called
  // It takes a function, return the function and take a dependency array. 
  // It runs everytime when value of dependency array's value (State or Prop) is changed. 
  // If no an empty array [] is defined then it runs only 1 time when this component is called.
  // If nothing is defined at the end then it runs on each renders.
  useEffect(() => {
    getData();
  }, [currentPage, pageSize, searchQuery]);

  // change page and size
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // For searching 
  const handleSearch = (value) => {
    setSearchQuery(value.trim() || "");
    setCurrentPage(1);
  };

  // For when to show edit component
  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setEditingId(null);
  };

  // For when to show delete component
  const handleDeleteModalClose = () => {
    setIsDeleteModalVisible(false);
    setDeleteId(null);
  };

  // When change the date from DatePicker  
  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
  };

  // Using ANTD set the values.
  const columns = [
    {
      title: "ID",
      key: "id",

      //render(rowindex, colindex, indexOfCurrentPage(Initial 0)) 
      render: (_, __, index) => index + 1 + (currentPage - 1) * pageSize,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Trad Date", dataIndex: "trad_date", key: "trad_date" },
    { title: "Biz Date", dataIndex: "biz_date", key: "biz_date" },
    { title: "Open", dataIndex: "open_price", key: "open_price" },
    { title: "High", dataIndex: "high_price", key: "high_price" },
    { title: "Low", dataIndex: "low_price", key: "low_price" },
    { title: "Close", dataIndex: "close_price", key: "close_price" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingId(record.id);
              setIsEditModalVisible(true);
            }}
          />

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              setDeleteId(record.id);
              setIsDeleteModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];


  return (
    <>
      <Navbar getData={getData} />


      <label style={{
        marginRight: 10, marginBottom: 20,
        marginTop: 20,
      }}>Download Bhav Copy:</label>
      <DatePicker onChange={handleDateChange} format="YYYY-MM-DD" style={{
        marginRight: 10, marginBottom: 20,
        marginTop: 20,
      }} />
      <DownloadBhavCopy request={{ date: selectedDate }} style={{
        marginRight: 10, marginBottom: 20,
        marginTop: 20,
      }} />


      {/* Search Bar */}
      <Input.Search
        placeholder="Search..."
        allowClear
        onSearch={handleSearch}
        style={{
          width: 250,
          marginBottom: 20,
          marginTop: 20,
          float: "right",
          marginRight: 10,
        }}
      />


      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {hasRecords && (
            <DownloadSearchResult searchQuery={searchQuery} />
          )}
          <Table
            dataSource={data}
            columns={columns}
            scroll={{ y: 650 }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalRecords,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
            }}
            onChange={handleTableChange}
            rowKey="id"
          />
        </>
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Record"
        open={isEditModalVisible}
        footer={null}
        onCancel={handleEditModalClose}
      >
        {editingId && (
          <Edit
            id={editingId}
            onClose={handleEditModalClose}
            refreshData={() => getData()}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Delete Record"
        open={isDeleteModalVisible}
        footer={null}
        onCancel={handleDeleteModalClose}
      >
        {deleteId && (
          <Delete
            id={deleteId}
            onClose={handleDeleteModalClose}
            refreshData={() => getData()}
          />
        )}
      </Modal>
    </>
  );
};

export default Home;
