import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const get_record_by_id = async (id) => {
  const response = await axios.get(`${BASE_URL}/get-csv-record/${id}/`);
  return response;
};

export const get_all_records = async (page, size, search) => {
  const response = await axios.get(
    `${BASE_URL}/get-csv-record/?page=${page}&size=${size}&search=${search}`
  );
  return response;
};

export const download_search_result = {
  downloadSearchResult: async (searchQuery) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/download/search-result/?search=${searchQuery}`,
        {
          responseType: "blob", // Ensure response is treated as a file (blob)
        }
      );
      return response;
    } catch (error) {
      console.error("Download error:", error);
      return {
        success: false,
        status: error.response?.status || 500,
        data: { message: "Something went wrong!" },
      };
    }
  },
};


export const download_bhav_copy = {
  downloadBhavCopy: async (request) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/download/bhav-copy/by-date/?date=${request}`,
        {
          responseType: "blob", // Ensure response is treated as a file (blob)
        }
      );
      return response;
    } catch (error) {
      console.error("Download error:", error);
      return {
        success: false,
        status: error.response?.status || 500,
        data: { message: "Something went wrong!" },
      };
    }
  },
};

export const upload_csv_file = async (fromData) => {
  const response = await axios.post(`${BASE_URL}/upload-csv/`, fromData, {
    headers: {
      "Content-Type": "multipart/form-data", // This is necessary for file uploads
    },
  });
  return response;
};

export const update_record_by_id = async (id, requestBody) => {
  const response = await axios.put(
    `${BASE_URL}/update-csv-record/${id}/`,
    requestBody
  );
  return response;
};

export const delete_record_by_id = async (id) => {
  const response = await axios.delete(`${BASE_URL}/remove-csv-record/${id}/`);
  return response;
};
