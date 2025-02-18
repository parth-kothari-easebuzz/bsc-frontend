import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React, { useState } from "react";
import { upload_csv_file } from "./Modles";
import { showAlert } from "../ApiResponseToasters";

const ParseResult = ({ getData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file, onSuccess, onError) => {
    if (file.type !== "text/csv") {
      showAlert("", "Please select a valid CSV file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await upload_csv_file(formData);
      onSuccess();
      showAlert("Records added successfully", "");
      getData();
    } catch (err) {
      onError(err);
      showAlert("", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload
      customRequest={({ file, onSuccess, onError }) =>
        handleUpload(file, onSuccess, onError)
      }
      showUploadList={false}
      accept=".csv"
    >
      <Button icon={<UploadOutlined />} loading={loading} type="primary">
        Click to Upload CSV
      </Button>
    </Upload>
  );
};

export default ParseResult;
