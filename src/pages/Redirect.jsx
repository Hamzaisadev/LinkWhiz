/* eslint-disable no-unused-vars */
import Loader from "@/components/loader";
import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import React, { use, useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });
  console.log(data);

  useEffect(() => {
    if (id) {
      fn();
    }
  }, [id]);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading, data]);

  if (loading || loadingStats) {
    return <Loader />;
  }

  return null;
};

export default Redirect;
