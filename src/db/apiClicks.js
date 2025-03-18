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
export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error("Unable to load Stats:", error);
    return null;
  }

  return data;
}

const parser = new UAParser();
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";
    const browser = res.browser.name || "Unknown";
    const os = res.os.name || "Unknown";
    const referrer = document.referrer;
    // Use a different CORS proxy
    const response = await fetch("https://ipinfo.io/json?token=399db4e8988ba4");
    const { city, country: country } = await response.json();
    console.log(res);

    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
      browser: browser,
      os: os,
      coming_from: referrer,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Unable to parse user agent", error);
  }
};
