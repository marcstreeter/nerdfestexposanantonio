import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/shadcn/native-select";
import { heroArtOptions } from "./hero-art";

interface Props {
  home?: { href: string; label: string };
  events: { href: string; current: boolean };
  about?: string;
  presenters?: string;
  directions: string;
  palettes: { value: string; label: string }[];
  showHeroArt: boolean;
  preview: boolean;
}

const menuBrand = (
  <span className="site-menu-monogram" aria-hidden="true">
    <span>N</span>
    <span className="site-menu-monogram-tail">
      <span>F</span>
      <span>E</span>
    </span>
  </span>
);

export default function SiteMenu({
  home,
  events,
  about,
  presenters,
  directions,
  palettes,
  showHeroArt,
  preview,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const settingsTrigger = useRef<HTMLButtonElement>(null);
  const settingsBack = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const settingsId = useId();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState("");
  const [plain, setPlain] = useState(false);
  const [heroArt, setHeroArt] = useState("");

  useEffect(() => {
    const { dataset } = document.documentElement;
    setPalette(dataset.palette ?? "");
    setPlain(dataset.background === "plain");
    setHeroArt(dataset.heroArt ?? "");
  }, []);

  useEffect(() => {
    if (dialog.current?.open) {
      (settingsOpen ? settingsBack : settingsTrigger).current?.focus();
    }
  }, [settingsOpen]);

  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function previewHref(href: string) {
    if (!preview || !palette) return href;
    const url = new URL(href, location.origin);
    url.searchParams.set("palette", palette);
    if (heroArt) url.searchParams.set("hero", heroArt);
    if (plain) url.searchParams.set("background", "plain");
    return url.pathname + url.search + url.hash;
  }

  const links = [
    ...(home ? [home] : []),
    { href: events.href, label: "Events", current: events.current },
    ...(about ? [{ href: about, label: "About" }] : []),
    ...(presenters ? [{ href: presenters, label: "Sign In" }] : []),
  ];
  return (
    <>
      <button
        type="button"
        className="site-menu-trigger"
        aria-label="Nerd Fest + Expo site menu"
        aria-haspopup="dialog"
        aria-controls={dialogId}
        aria-expanded={open}
        onClick={openMenu}
      >
        {menuBrand}
        <span className="site-menu-toggle" aria-hidden="true">
          <Menu size={24} />
        </span>
      </button>
      <dialog
        ref={dialog}
        id={dialogId}
        aria-label="Nerd Fest + Expo site menu"
        className="site-menu"
        onClose={() => {
          if (dialog.current?.open) return;
          setOpen(false);
          setSettingsOpen(false);
        }}
      >
        <div className="site-menu-header">
          <button
            type="button"
            className="site-menu-close"
            aria-label="Close menu"
            onClick={() => dialog.current?.close()}
          >
            {menuBrand}
            <span className="site-menu-toggle" aria-hidden="true">
              <X size={24} />
            </span>
          </button>
        </div>
        <div className="site-menu-scroll">
          <div className="wrap site-menu-body">
            <nav
              className="site-menu-links"
              aria-label="Expo navigation"
              hidden={settingsOpen}
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={previewHref(link.href)}
                  aria-current={
                    "current" in link && link.current ? "page" : undefined
                  }
                >
                  {link.label}
                  <ArrowRight aria-hidden="true" />
                </a>
              ))}
              <a href={directions}>
                Map &amp; directions
                <ArrowUpRight aria-hidden="true" />
              </a>
              <button
                ref={settingsTrigger}
                type="button"
                aria-controls={settingsId}
                onClick={() => setSettingsOpen(true)}
              >
                Page Settings <ArrowRight aria-hidden="true" />
              </button>
            </nav>
            <p className="site-menu-address" hidden={settingsOpen}>
              3644 Talley Rd, San Antonio
            </p>

            <section
              id={settingsId}
              className="site-menu-settings-view"
              aria-label="Page Settings"
              hidden={!settingsOpen}
            >
              <button
                ref={settingsBack}
                type="button"
                className="site-menu-back"
                onClick={() => setSettingsOpen(false)}
              >
                <ArrowLeft size={18} aria-hidden="true" /> Back to menu
              </button>
              <fieldset className="site-menu-settings">
                <legend>Page settings</legend>
                <label>
                  Palette
                  <NativeSelect
                    value={palette}
                    onChange={({ currentTarget: { value } }) => {
                      setPalette(value);
                      document.dispatchEvent(
                        new CustomEvent("nerdfest:palette", { detail: value }),
                      );
                    }}
                  >
                    {palettes.map(({ label, value }) => (
                      <NativeSelectOption key={value} value={value}>
                        {label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </label>
                {showHeroArt && (
                  <label>
                    Hero illustration
                    <NativeSelect
                      value={heroArt}
                      onChange={({ currentTarget: { value } }) => {
                        setHeroArt(value);
                        document.dispatchEvent(
                          new CustomEvent("nerdfest:hero-art", {
                            detail: value,
                          }),
                        );
                      }}
                    >
                      {heroArtOptions.map(({ label, value }) => (
                        <NativeSelectOption key={value} value={value}>
                          {label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </label>
                )}
              </fieldset>
            </section>
          </div>
        </div>
      </dialog>
    </>
  );
}
