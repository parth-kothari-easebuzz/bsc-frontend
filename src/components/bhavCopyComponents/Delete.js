import { Button, Form, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { delete_record_by_id, get_record_by_id } from "./Modles";
import { showAlert } from "../ApiResponseToasters";

// Typography is a antd component which is use for multiple 
// text related component like text, title, link, paragraph etc.
const { Text } = Typography;

const Delete = ({ id, onClose, refreshData }) => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecordById = async () => {
    try {
      setIsLoading(true)
      const response = await get_record_by_id(id);

      setRecord(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("", "No record found for requested id");
      return
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchRecordById();
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const response = await delete_record_by_id(id);
      console.log(response.data);
      console.log(response.status);
      refreshData();
      onClose();
      showAlert(response.data?.message, "");
    } catch (error) {
      console.error("Error deleting record:", error);

      showAlert("", "Failed to delete the record.");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Form form={form} onFinish={handleDelete} layout="vertical">
          <Form.Item name="name" label="Name">
            <Text>{record?.name}</Text>
          </Form.Item>
          <Form.Item name="trad_date" label="Trad Date">
            <Text>{record?.trad_date}</Text>
          </Form.Item>
          <Form.Item name="open_price" label="Open">
            <Text>{record?.open_price}</Text>
          </Form.Item>
          <Form.Item name="close_price" label="Close">
            <Text>{record?.close_price}</Text>
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger htmlType="submit">
              Delete
            </Button>
            <Button onClick={onClose} style={{ marginLeft: 10 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}


    </>

  );
};

export default Delete;
