"use client";
import { motion } from "framer-motion";
import DriveConverterUI from "@/packages/drive-link-converter/drive-converter-ui";

/**
 * ShowcasePage Component
 *
 * The layout for presenting a gallery of "mini-apps" or specific feature demonstrations.
 * Currently serves as a playground environment for decoupled tools like the 
 * DriveConverterUI.
 *
 * @returns {JSX.Element} The showcase page component.
 */
export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-brand-blue pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-brand-navy mb-6"
          >
            Playground
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-navy/70 max-w-2xl"
          >
            A collection of mini-apps, utilities, and experiments. Built
            modularly to eventually live in the wild as standalone tools.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Inject our decoupled mini-app */}
            <DriveConverterUI />
          </motion.div>

          {/* You can add more tools here in the future */}
          {/* <motion.div><AnotherToolUI /></motion.div> */}
        </div>
      </div>
    </div>
  );
}
