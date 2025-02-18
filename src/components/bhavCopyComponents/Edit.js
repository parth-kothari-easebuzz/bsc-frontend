import { Button, DatePicker, Form, Input, InputNumber, Spin } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { date_format } from "../const";
import { get_record_by_id, update_record_by_id } from "./Modles";
import { showAlert } from "../ApiResponseToasters";

const Edit = ({ id, onClose, refreshData }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecordById = async () => {
    try {
      setIsLoading(true)
      const response = await get_record_by_id(id);
      const record = response.data;

      form.setFieldsValue({
        ...record,
        trad_date: record.trad_date ? dayjs(record.trad_date) : null,
        biz_date: record.biz_date ? dayjs(record.biz_date) : null,
        open_price: Number(record.open_price),
        high_price: Number(record.high_price),
        low_price: Number(record.low_price),
        close_price: Number(record.close_price),
      });
    } catch (error) {
      console.error("Error fetching record:", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchRecordById();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true)
      const formattedValues = {
        ...values,
        trad_date:
          values.trad_date && values.trad_date.isValid()
            ? values.trad_date.format(date_format)
            : null,
        biz_date:
          values.biz_date && values.biz_date.isValid()
            ? values.biz_date.format(date_format)
            : null,
      };

      const response = await update_record_by_id(id, formattedValues);
      refreshData();
      onClose();
      console.log(response.data);
      showAlert(response.data?.message, "");
    } catch (error) {
      console.error("Error updating record:", error);
      showAlert("", "Failed to update the record.");
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
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter name!" },
              { whitespace: true, message: "Name cannot be only spaces" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="trad_date"
            label="Trad-Date"
            rules={[{ required: true, message: "Trad-Date is required." }]}
          >
            <DatePicker format={date_format} />
          </Form.Item>

          <Form.Item
            name="biz_date"
            label="Biz-Date"
            rules={[{ required: true, message: "Biz-Date is required." }]}
          >
            <DatePicker format={date_format} />
          </Form.Item>

          <Form.Item
            name="open_price"
            label="Open"
            rules={[
              { required: true, message: "Please enter a valid number." },
            ]}
          >
            <InputNumber max={100000000} min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="high_price"
            label="High-Price"
            rules={[
              { required: true, message: "Please enter a valid number." },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="low_price"
            label="Low-Price"
            rules={[
              { required: true, message: "Please enter a valid number." },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="close_price"
            label="Close"
            rules={[
              { required: true, message: "Please enter a valid number." },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
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

export default Edit;
