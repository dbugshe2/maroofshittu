"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[3rem] p-8 md:p-16 max-w-2xl w-full relative shadow-sm"
      >
        {/* Floating Avatar */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <Image
            src="/avatar.jpg"
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full border-4 border-white shadow-md object-cover w-24 h-24"
          />
        </div>

        <div className="text-center mt-8 mb-12">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">Say Hello.</h1>
          <p className="text-gray-500">
            Just drop a line, I&apos;ll figure out the best option for you
          </p>
        </div>

        <form className="space-y-8 animate__animated animate__fadeInUp">
          {" "}
          {/* Using animate.css here for standard fade */}
          <div className="space-y-2">
            <Input
              placeholder="Name"
              className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-brand-navy text-lg h-12"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-brand-navy text-lg h-12"
            />
          </div>
          <div className="space-y-2 pb-4">
            <Textarea
              placeholder="Message"
              className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-brand-navy text-lg resize-none min-h-[100px]"
            />
          </div>
          <Button className="w-full bg-brand-orange hover:bg-orange-600 text-white rounded-full py-6 text-lg transition-all hover:scale-[1.02]">
            Submit
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
