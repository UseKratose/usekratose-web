import Button from "@/components/atoms/button";
import { images, pricing } from "@/constants";
import React from "react";
import Image from "next/image";

type Props = {};

const PricingList = (props: Props) => {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="h-full min-w-0 rounded-[2rem] border border-n-6 bg-n-8 px-6 py-8 lg:first:mt-4 lg:last:mt-4 lg:even:py-12 [&>h4]:first:text-color-2 [&>h4]:last:text-color-3 [&>h4]:even:text-color-1"
        >
          <h4 className="h4 mb-4">{item.title}</h4>
          <p className="body-2 mb-3 min-h-16 text-n-1/50">{item.description}</p>

          <div className="mb-6 flex h-[5.5rem] items-center">
            <span className="mr-3 font-code text-xs uppercase tracking-wider text-n-4">Level</span>
            <span className="text-[5.5rem] font-bold leading-none">{item.level}</span>
          </div>

          <Button
            className="mb-6 w-full"
            href="/signup"
            white
          >
            Start monitoring
          </Button>

          <ul>
            {item.features.map((feature, index) => (
              <li key={index} className="flex items-start border-t border-n-6 py-5">
                <Image src={images.check} width={24} height={24} alt="check" />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
