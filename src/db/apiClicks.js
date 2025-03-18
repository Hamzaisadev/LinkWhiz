import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

const parser = new UAParser();
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    await supabase.from("clicks").insert({
      url_id: id,

      device: device,
    });
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Unable to parse user agent", error);
  }
};
