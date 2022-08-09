import React, { useState } from "react";
import * as Icons from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import Image from "next/image";
import useCompetions from "../../lib/getCompetitons";

const PrizesCarousel = () => {
  let [count, setCount] = useState(1);
  let [tuple, setTuple] = useState([null, count]);
  let [ref, { width }] = useMeasure();

   const { data, isLoading, isSuccess, isError } = useCompetions();

  if (tuple[1] !== count) {
    setTuple([tuple[1], count]);
  }

  console.log(data[Math.abs(count) % data.length]);

  let prev = tuple[0];

  let direction = count > prev ? 1 : -1;

  return (
    <div className="relative mx-auto my-3 h-[300px] text-white">
      <div className="absolute inset-0 z-[2000] h-full w-full">
        <div className="mt-6 absolute inset-0 z-[2000] w-full flex h-full items-end justify-between">
          <button className="rounded-full" onClick={() => setCount(count - 1)}>
            <Icons.ChevronDoubleLeftIcon className="h-12 w-12" />
          </button>
          <button className="rounded-full" onClick={() => setCount(count + 1)}>
            <Icons.ChevronDoubleRightIcon className="h-12 w-12" />
          </button>
        </div>
      </div>

      <div className="flex h-full items-center justify-center">
        <div
          ref={ref}
          className="relative flex h-full w-full  items-center justify-center overflow-hidden"
        >
          <AnimatePresence custom={{ direction, width }}>
            <motion.div
              key={count}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={{ direction, width }}
              transition={{ duration: 0.6 }}
              className={`absolute flex flex-col items-center h-full w-full items-center justify-center`}
            >
              <Image
                width={1920}
                height={1280}
                className="z-[100] h-full w-full object-cover"
                src={data[Math.abs(count) % data.length].prize_image}
                alt={data[Math.abs(count) % data.length].title}
              />
              <h3 className="text-xl font-medium mt-1">{data[Math.abs(count) % data.length].title}</h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PrizesCarousel;

let variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
};

let colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-sky-500",
  "bg-zinc-500",
  "bg-yellow-500",
];

let images = [
  "/images/laptop.jpeg",
  "/images/mac.jpeg",
  "/images/mobile.jpeg",
  "/images/screens.jpeg",
  "/images/table.jpeg",
  "/images/vr.jpeg",
];
