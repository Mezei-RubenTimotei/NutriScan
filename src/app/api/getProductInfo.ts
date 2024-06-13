import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { scanResult } from "../dataTypes/types";

export const getProductInfo = async (barcode: string) => {
  try {
    const response: scanResult = await axios.get(
      `${API_URL}/products/barcode/${barcode}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
