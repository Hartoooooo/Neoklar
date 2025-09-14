"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSectionOne() {
  return (
    <div
      className="relative mx-auto flex max-w-7xl flex-col items-center justify-center min-h-screen">
      <div
        className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20 text-center">
        <h1
          className="relative z-10 mx-auto max-w-4xl text-2xl font-bold text-white md:text-4xl lg:text-7xl">
          {"DIGITALE AI ARCHITEKTUR"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block">
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-lg font-normal text-gray-300">
          Mit KI-gestützter Technologie machen wir Sie sichtbar. Moderne Webentwicklung 
          mit Next.js, React und Tailwind CSS für maximale Performance und Benutzerfreundlichkeit.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const element = document.querySelector('#contact')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="w-60 transform rounded-lg bg-cyber-500 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyber-400">
            PROJEKT STARTEN
          </button>
          <button
            onClick={() => {
              const element = document.querySelector('#services')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="w-60 transform rounded-lg border border-cyber-500 bg-transparent px-6 py-2 font-medium text-cyber-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyber-500 hover:text-white">
            PROJEKTE ERKUNDEN
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-gray-700 bg-gray-900/50 p-4 shadow-md backdrop-blur-sm">
          <div
            className="w-full overflow-hidden rounded-xl border border-gray-600">
            <Image
              src="/schaerfservice-full-screenshot.jpg"
              alt="NEOKLAR Webseite Preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

