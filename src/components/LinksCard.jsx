import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Home, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const LinksCard = ({ url, fetchUrls }) => {
  const downloadQr = async () => {
    const imageUrl = url?.qr_code;
    const fileName = url?.title;
    console.log(url?.qr_code);
    console.log(url);

    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url); // Clean up the URL

      // Improved toast message
      toast.success(`Successfully downloaded ${fileName}`);
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  const handleDelete = async () => {
    toast
      .promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            fnDelete()
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }, 1000);
        }),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        }
      )
      .then(() => {
        fetchUrls();
      });
  };

  const preLink = window.location.origin;
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg w-full overflow-hidden justify-center">
      <img
        src={url?.qr_code}
        className="h-auto max-h-32 object-contain ring ring-blue-500 self-center"
        alt={`QR code for ${url?.title}`}
      />
      <Link
        to={`/link/${url?.id}`}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <span className="md:text-3xl text-xl font-extrabold hover:underline cursor-pointer truncate">
          {url?.title}
        </span>

        <span className="text-lg md:text-2xl text-blue-400 font-bold hover:underline cursor-pointer truncate">
          {preLink}/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer truncate">
          {url?.original_url}
        </span>
        <span className="flex item-end font-extralight text-sm flex-1 truncate">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex flex-row gap-2 flex-wrap">
        <Button
          variant="ghost"
          onClick={() => {
            window.open(url?.short_url, "_blank");
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Home />
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard
              .writeText(`${preLink}/${url?.short_url}`)
              .then(() => toast.success("Link copied to clipboard!"))
              .catch(() => toast.error("Failed to copy link"));
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Copy />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
        <Button variant="ghost" onClick={downloadQr}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Download />
              </TooltipTrigger>
              <TooltipContent>
                <p>Download QR Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Trash />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </div>
    </div>
  );
};

export default LinksCard;
