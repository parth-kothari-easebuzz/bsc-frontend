import React, { useState } from "react";
import { Button } from "antd";
import { download_bhav_copy } from "./Modles";
import FileSaver from "file-saver";
import { showAlert } from "../ApiResponseToasters";
import dayjs from "dayjs";

const DownloadBhavCopy = ({ request }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!request.date) {
            showAlert("", "Please select a date.");
            return;
        }

        const formattedDate = dayjs(request.date).format("YYYYMMDD");

        setIsDownloading(true);
        try {
            const response = await download_bhav_copy.downloadBhavCopy(formattedDate);

            if (response && response.status === 200) {
                FileSaver.saveAs(response.data, `BhavCopy_${formattedDate}.csv`);
                showAlert("Download completed.", "");
            } else {
                showAlert("", "File not found");
            }
        } catch (error) {
            showAlert("", "Error downloading file.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Button
            type="primary"
            onClick={handleDownload}
            loading={isDownloading}
            style={{ marginLeft: 10 }}
        >
            {isDownloading ? "Downloading..." : "Download"}
        </Button>
    );
};

export default DownloadBhavCopy;
