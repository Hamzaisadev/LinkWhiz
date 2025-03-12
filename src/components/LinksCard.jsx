import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const LinksCard = ({ url, fetchUrls }) => {
  const preLink = window.location.origin;
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr_code}
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="qr code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>

        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {preLink}/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex item-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard
              .writeText(`${preLink}/${url?.short_url}`)
              .then(() => toast.success("Link copied to clipboard!"))
              .catch(() => toast.error("Failed to copy link"));
          }}
        >
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                padding: "20px",
                fontSize: "20px",
              },
            }}
          />
          <Copy />
        </Button>
        <Button variant="ghost">
          <Download />
        </Button>
        <Button variant="ghost">
          <Delete />
        </Button>
      </div>
    </div>
  );
};

export default LinksCard;
