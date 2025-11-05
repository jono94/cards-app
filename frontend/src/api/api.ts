import axios from "axios";
import { settings } from "@/src/lib/settings";

export const api = axios.create({
  baseURL: settings.apiUrl,
});
