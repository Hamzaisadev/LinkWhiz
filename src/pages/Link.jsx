import Device from "@/components/device_stats";
import Loader from "@/components/loader";
import Location from "@/components/location-stats";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, Home, LinkIcon, Share2, Trash } from "lucide-react";
import "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Link = ({ urls, fetchUrls }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
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

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = UrlState();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
    console.log(link);
  }

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
      .writeText(`${baseUrl}/${link}`)
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
              <Input id="link" defaultValue={`${baseUrl}/${link}`} readOnly />
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

  return (
    <>
      {(loading || loadingStats) && <Loader loadMsg="Loading Statistics" />}

      <div className="flex flex-col gap-8 sm:flex-row  justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`${baseUrl}/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline truncate cursor-pointer"
          >{`${baseUrl}/${link}`}</a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline truncate  cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
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

          <img
            src={url?.qr_code}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <Device stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
