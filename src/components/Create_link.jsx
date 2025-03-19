import React, { useEffect, useRef, useState } from "react";
import * as Yup from "Yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { QRCode } from "react-qrcode-logo";
import { createUrl } from "@/db/apiUrls";
import logo from "@/assets/LinkWhiz (350 x 100 px).png";
import { Skeleton } from "./ui/skeleton";
import toast from "react-hot-toast";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });
  const ref = useRef();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()

      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
      toast.success("Link Created Successfully");
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);

    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Dialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <DialogTrigger asChild>
          <Button variant="destructive">Create Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Link</DialogTitle>
          </DialogHeader>

          {loading ? (
            <Skeleton className="h-64 w-64" />
          ) : (
            formValues?.longUrl && (
              <QRCode
                logoImage={logo}
                ref={ref}
                size={250}
                value={formValues?.longUrl}
                logoPaddingStyle="circle"
                removeQrCodeBehindLogo="true"
                logoPadding={2}
                qrStyle="circle"
              />
            )
          )}

          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter Your Looong Url"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="p-2">{baseUrl}</Card>
            /
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
            {errors.customUrl && <Error message={errors.customUrl} />}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={createNewLink}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size="5" className="animate-spin" />
                  Creating
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateLink;
