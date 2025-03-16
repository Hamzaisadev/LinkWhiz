import CreateLink from "@/components/Create_link";
import Error from "@/components/error";
import LinksCard from "@/components/LinksCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useQuery } from "@tanstack/react-query";
import { Filter, FilterIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    isLoading: isUrlsLoading,
    error,
    data: urls,
    refetch: refetchUrls,
  } = useQuery({
    queryKey: ["urls", user?.id],
    queryFn: () => getUrls(user?.id),
    enabled: !!user?.id,
  });

  const {
    isLoading: isClicksLoading,
    refetch: refetchClicks,
    data: clicks,
  } = useQuery({
    queryKey: ["clicks", urls?.map((url) => url.id)],
    queryFn: () => getClicksForUrls(urls?.map((url) => url.id)),
    enabled: !!urls?.length,
  });

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const LoadingSkeleton = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-[120px] w-full rounded-lg" />
        <Skeleton className="h-[120px] w-full rounded-lg" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[100px] w-full rounded-lg my-4" />
      ))}
    </>
  );

  if (isUrlsLoading) {
    return (
      <div className="flex flex-col gap-8">
        <LoadingSkeleton />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>{clicks?.length || 0} </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinksCard key={i} url={url} fetchUrls={refetchUrls} />;
      })}
    </div>
  );
};

export default Dashboard;
