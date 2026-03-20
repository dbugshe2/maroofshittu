"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check, Link as LinkIcon, AlertCircle } from "lucide-react";
import { generateDirectDriveLink } from "./index"; // Importing the pure logic

/**
 * DriveConverterUI Component
 *
 * A user interface component that allows users to paste a Google Drive 
 * share link and converts it into a direct image hosting URL.
 * It provides error handling for invalid links and a one-click copy feature.
 *
 * @returns {JSX.Element} The rendered converter user interface.
 */
export default function DriveConverterUI() {
  const [inputUrl, setInputUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputUrl(val);
    setError(null);
    setCopied(false);

    if (!val.trim()) {
      setOutputUrl(null);
      return;
    }

    const converted = generateDirectDriveLink(val);
    if (converted) {
      setOutputUrl(converted);
    } else {
      setOutputUrl(null);
      setError("Hmm, that doesn't look like a valid Google Drive share link.");
    }
  };

  const copyToClipboard = async () => {
    if (!outputUrl) return;
    await navigator.clipboard.writeText(outputUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-xl w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-navy mb-2 flex items-center gap-2">
          <LinkIcon className="w-6 h-6 text-brand-orange" />
          Drive Link Converter
        </h3>
        <p className="text-gray-500 text-sm">
          Paste a Google Drive share link to get a direct image hosting URL.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            type="url"
            placeholder="https://drive.google.com/file/d/..."
            value={inputUrl}
            onChange={handleConvert}
            className="border-gray-200 h-12 text-md focus-visible:ring-brand-orange"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.p>
          )}
        </div>

        <AnimatePresence>
          {outputUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-brand-pink/30 rounded-xl border border-brand-pink mt-4 relative group">
                <p className="text-sm font-mono text-brand-navy break-all pr-12 selection:bg-brand-orange selection:text-white">
                  {outputUrl}
                </p>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-navy hover:text-brand-orange hover:bg-white"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
