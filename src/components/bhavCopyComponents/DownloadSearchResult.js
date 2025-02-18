import React, { useState } from "react";
import { Button } from "antd";
import FileSaver from "file-saver";
import { download_search_result } from "./Modles";
import { showAlert } from "../ApiResponseToasters";

const DownloadSearchResult = ({ searchQuery }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {

    setIsDownloading(true);
    const query = searchQuery || "";
    const response = await download_search_result.downloadSearchResult(
      query
    );

    if (response && response.status === 200) {
      FileSaver.saveAs(
        response.data,
        `search-results-${searchQuery}-${new Date().toISOString()}.csv`
      );
      showAlert("Download completed.", "");
    } else {
      showAlert("", "Something went wrong");
    }

    setIsDownloading(false);
  };

  return (
    <Button
      type="primary"
      onClick={handleDownload}
      disabled={isDownloading}
      loading={isDownloading}
      style={{
        width: 250,
        marginBottom: 20,
        marginTop: 20,
        float: "right",
        marginRight: 15,
      }}
    >
      {isDownloading ? "Downloading..." : "Download Records"}
    </Button>
  );
};

export default DownloadSearchResult;
