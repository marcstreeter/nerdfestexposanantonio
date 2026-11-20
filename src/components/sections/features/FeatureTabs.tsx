import type { ReactNode } from "react";
import Icon from "@components/ui/icons/Icon.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";

interface Props {
  children?: ReactNode;
  tabs: {
    heading: string;
    content: string;
    svg: string;
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    first?: boolean;
    second?: boolean;
  }[];
}

export default function FeatureTabs({ children, tabs }: Props) {
  const firstTab = Math.max(
    0,
    tabs.findIndex(({ first }) => first),
  );
  return (
    <Tabs
      defaultValue={`feature-${firstTab}`}
      orientation="vertical"
      className="relative z-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16"
    >
      <div className="mb-10 lg:order-2 lg:col-span-6 lg:col-start-8 lg:mb-0">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-3xl">
          {children}
        </h2>
        <TabsList
          aria-label="Expo highlights"
          className="mt-5 grid h-auto justify-stretch gap-4 bg-transparent p-0 md:mt-10"
        >
          {tabs.map(({ heading, content, svg }, index) => (
            <TabsTrigger
              key={index}
              value={`feature-${index}`}
              className="group flex w-full items-start justify-start whitespace-normal rounded-xl p-4 text-start text-base font-normal ring-zinc-500 hover:bg-neutral-200 focus-visible:ring-offset-0 data-[state=active]:bg-neutral-50 data-[state=active]:shadow-md dark:ring-zinc-200 dark:hover:bg-neutral-700 dark:data-[state=active]:bg-neutral-700/60 md:p-5"
            >
              <Icon name={svg} />
              <span className="ms-6 grow">
                <span className="block text-lg font-bold text-neutral-800 group-data-[state=active]:text-orange-400 dark:text-neutral-200 dark:group-data-[state=active]:text-orange-300">
                  {heading}
                </span>
                <span className="mt-1 block text-neutral-500 group-data-[state=active]:text-neutral-600 dark:text-neutral-400 dark:group-data-[state=active]:text-neutral-200">
                  {content}
                </span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className="lg:col-span-6">
        {tabs.map(({ src, alt, width, height, second }, index) => (
          <TabsContent
            key={index}
            value={`feature-${index}`}
            className="mt-0 ring-zinc-500 focus-visible:ring-offset-0 dark:ring-zinc-200"
          >
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              draggable={false}
              loading="eager"
              className={
                second
                  ? "aspect-[5/4] rounded-xl bg-neutral-300 object-cover p-3 shadow-xl shadow-neutral-200 dark:bg-neutral-600 dark:shadow-neutral-900/[.2] lg:aspect-auto"
                  : "aspect-[3/2] rounded-xl object-cover shadow-xl shadow-neutral-200 dark:shadow-neutral-900/[.2] lg:aspect-auto"
              }
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
