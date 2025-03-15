// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import banner from "../assets/banner.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UrlState } from "@/context";

const Landing = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();
  const { isAuthenticated } = UrlState();

  const handleShorten = (e) => {
    e.preventDefault();
    if (!longUrl) {
      toast.error("Please Enter a URL");
      return;
    }
    if (!isAuthenticated) {
      toast.error("You must be logged in to shorten a URL.");
      setTimeout(() => {
        navigate(`/auth?createNew=${longUrl}`);
      }, 2000);
      return;
    }
    if (longUrl) {
      try {
        new URL(longUrl);
        navigate(`/auth?createNew=${longUrl}`);
      } catch (error) {
        toast.error("Please enter a valid URL");
      }
    } else {
      toast.error("Please enter a URL");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold ">
        Make every link shorter, smarter,
        <br /> and easier to share.👇{" "}
      </h2>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter Your looong URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />
        <Button type="submit" className="h-full">
          Shorten!
        </Button>
      </form>
      <img src={banner} alt="banner" className="w-full my-11 md:px-11"></img>

      <h1 className=" text-5xl">FAQs</h1>

      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is LinkWhiz?</AccordionTrigger>
          <AccordionContent>
            LinkWhiz is a powerful and easy-to-use URL shortener that helps you
            create shorter, more manageable links while tracking their
            performance.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is LinkWhiz free to use?</AccordionTrigger>
          <AccordionContent>
            Yes! LinkWhiz offers a free plan with essential features. We also
            provide premium options with advanced analytics and customization.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can I track link analytics?</AccordionTrigger>

          <AccordionContent>
            Using LinkWhiz is simple! Just follow these steps: 1. Paste your
            long URL into the input box. 2. Click the "Shorten" button. 3. Copy
            your new short link and share it anywhere! If you have an account,
            you can also track analytics, customize your link, and generate QR
            codes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I customize my short links?</AccordionTrigger>
          <AccordionContent>
            Yes! With LinkWhiz, you can create branded links and customize the
            alias to make your URLs more recognizable.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How long do shortened links last?</AccordionTrigger>
          <AccordionContent>
            Free links stay active indefinitely unless removed. Premium users
            can set expiration dates and advanced controls.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Does LinkWhiz support QR codes?</AccordionTrigger>
          <AccordionContent>
            Yes! You can generate QR codes for your shortened links, making
            sharing even easier.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>Is LinkWhiz secure?</AccordionTrigger>
          <AccordionContent>
            100%! We prioritize security by protecting your links with
            encryption and offering additional privacy settings.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>How do I use LinkWhiz?</AccordionTrigger>
          <AccordionContent>
            Absolutely! LinkWhiz provides real-time analytics, including click
            counts, location data, and device insights.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
