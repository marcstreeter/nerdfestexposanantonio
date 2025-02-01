import Icon from "@components/ui/icons/Icon.tsx";
import React from "react";
interface Props {
  icon: string;
  heading?: string;
  description?: string;
  address?: string;
  link?: { title: string; url: string };
  children: React.ReactNode;
}
export default ({
  icon,
  heading,
  description,
  address,
  link,
  children,
}: Props) => {
  const isAddressVisible = address != null || address != "";
  const isLinkVisible = link != null;
  const hasDescription = description != null || description != "";
  // Define SVG arrow to be used in the component
  const ArrowSVG = () => {
    return (
      <svg
        className="h-4 w-4 flex-shrink-0 transition ease-in-out group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    );
  };
  return (
    <div className="flex gap-x-7 py-6">
      <Icon name={icon} />
      <div className="grow">
        <h3 className="font-bold text-neutral-700 dark:text-neutral-300">
          {heading}
        </h3>
        {hasDescription ? (
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        ) : null}
        {children}
        {isAddressVisible ? (
          <p className="mt-1 text-sm italic text-neutral-500">{address}</p>
        ) : null}
        {isLinkVisible ? (
          <a
            className="group mt-2 inline-flex items-center gap-x-2 rounded-lg text-sm font-medium text-zinc-600 outline-none ring-zinc-500 transition duration-300 hover:text-zinc-800 focus-visible:ring dark:text-zinc-400 dark:ring-zinc-200 dark:hover:text-zinc-200 dark:focus:outline-none dark:focus:ring-1"
            href={link.url}
          >
            {link.title}
            <ArrowSVG />
          </a>
        ) : null}
      </div>
    </div>
  );
};
