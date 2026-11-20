import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { heroArtOptions } from "./hero-art";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

interface Props {
  home?: { href: string; label: string };
  about?: string;
  presenters?: string;
  directions: string;
  palettes: { value: string; label: string }[];
  showHeroArt: boolean;
}

export default function SiteMenu({
  home,
  about,
  presenters,
  directions,
  palettes,
  showHeroArt,
}: Props) {
  const [palette, setPalette] = useState("");
  const [plain, setPlain] = useState(false);
  const [heroArt, setHeroArt] = useState("");

  useEffect(() => {
    const { dataset } = document.documentElement;
    setPalette(dataset.palette ?? "");
    setPlain(dataset.background === "plain");
    setHeroArt(dataset.heroArt ?? "");
  }, []);

  function previewHref(href: string) {
    if (!palette) return href;
    const url = new URL(href, location.origin);
    url.searchParams.set("palette", palette);
    if (heroArt) url.searchParams.set("hero", heroArt);
    if (plain) url.searchParams.set("background", "plain");
    return url.pathname + url.search + url.hash;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="brand"
        aria-label="Nerd Fest + Expo site menu"
      >
        <span className="brand-name">
          NERD FEST<span className="brand-plus">+</span>EXPO
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6} className="menu-panel">
        {home && (
          <DropdownMenuItem asChild className="menu-link">
            <a href={presenters ? previewHref(home.href) : home.href}>
              {home.label}
            </a>
          </DropdownMenuItem>
        )}
        {about && (
          <DropdownMenuItem asChild className="menu-link">
            <a href={previewHref(about)}>About &amp; FAQ</a>
          </DropdownMenuItem>
        )}
        {presenters && (
          <DropdownMenuItem asChild className="menu-link">
            <a href={previewHref(presenters)}>Presenter login</a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="menu-link">
          <a href={directions}>
            Map &amp; directions
            <span>3644 Talley Rd, San Antonio</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="menu-divider" />
        <DropdownMenuLabel className="menu-settings">
          Page settings
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          aria-label="Palette"
          value={palette}
          onValueChange={(value) => {
            setPalette(value);
            document.dispatchEvent(
              new CustomEvent("nerdfest:palette", { detail: value }),
            );
          }}
        >
          {palettes.map(({ label, value }) => (
            <DropdownMenuRadioItem
              className="menu-palette"
              key={value}
              value={value}
              onSelect={(event) => event.preventDefault()}
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        {showHeroArt && (
          <>
            <DropdownMenuSeparator className="menu-divider" />
            <DropdownMenuLabel className="menu-settings">
              Hero illustration
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              aria-label="Hero illustration"
              value={heroArt}
              onValueChange={(value) => {
                setHeroArt(value);
                document.dispatchEvent(
                  new CustomEvent("nerdfest:hero-art", { detail: value }),
                );
              }}
            >
              {heroArtOptions.map(({ label, value }) => (
                <DropdownMenuRadioItem
                  className="menu-palette"
                  key={value}
                  value={value}
                  onSelect={(event) => event.preventDefault()}
                >
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
