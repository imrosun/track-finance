import { nanoid } from "nanoid";

export function getBrowserId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("browser_id");
  if (!id) {
    id = nanoid();
    localStorage.setItem("browser_id", id);
  }
  return id;
}
