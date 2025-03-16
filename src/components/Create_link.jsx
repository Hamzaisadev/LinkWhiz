import React from "react";
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

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Create Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Link</DialogTitle>
          </DialogHeader>

          <Input id="title" placeholder="Short Link's Title" />
          <Error message={"some error"} />

          <Input id="title" placeholder="Short Link's Title" />
          <Error message={"some error"} />

          <div className="flex items-center gap-2">
            <Card className="p-2">linkwhiz.vercel.app</Card>
            /
            <Input id="title" placeholder="Custom Link (optional)" />
          </div>
          <Error message={"some error"} />
          <DialogFooter>
            <Button>Create Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
