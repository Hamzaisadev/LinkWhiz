import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Home, Share2, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";

const LinksCard = ({ url, fetchUrls }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

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
      toast.error("Failed to download image", error);
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

  const DeleteDialog = () => {
    return (
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              link. This will also remove link stats from your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-500 red">
              <Button
                className="bg-red-500 hover:bg-red-500"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(`${baseUrl}/${url?.short_url}`)
      .then(() => {
        toast.success("Link copied to clipboard!");
        setShareDialogOpen(false);
      })
      .catch(() => toast.error("Failed to copy link"));
  };

  const ShareDialog = () => {
    return (
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Share this short link, and anyone with it can visit the original
              page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <label htmlFor="link" className="sr-only">
                Link
              </label>
              <Input
                id="link"
                defaultValue={`${baseUrl}/${
                  url?.custom_url ? url?.custom_url : url?.short_url
                }`}
                readOnly
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={handleShare}
            >
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
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
          {baseUrl}/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer truncate">
          {url?.original_url}
        </span>
        <span className="flex item-end font-extralight text-sm flex-1 truncate">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex flex-row gap-2 flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-[40px] h-[36px]">
              <Button
                variant="ghost"
                onClick={() => {
                  window.open(`${baseUrl}` / url?.short_url, "_blank");
                }}
              >
                <Home />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-[40px] h-[36px]">
              <Button
                variant="ghost"
                onClick={() => {
                  setShareDialogOpen(true);
                }}
              >
                <Share2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-[40px] h-[36px]">
              <Button variant="ghost" onClick={downloadQr}>
                <Download />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download QR Code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-[40px] h-[36px]">
              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ShareDialog />
      <DeleteDialog />
    </div>
  );
};

export default LinksCard;
