import React, { useEffect, useState } from "react";
import { rsvpStore, type Store } from "@/stores/rsvp";
import { browserStore, type Browser } from "@/stores/uuid.ts";
import SubmitButton from "@components/ui/forms/SubmitInput.tsx";
import ContactIconBlock from "./ContactedIcon.tsx";
import SelectInput from "./SelectedInput.tsx";
import NameFirstInput from "@components/ui/forms/NameFirstInput.jsx";
import NameLastInput from "@components/ui/forms/NameLastInput.jsx";
import Checkbox from "@components/ui/forms/Checkbox.tsx";
import EmailInput from "@components/ui/forms/EmailInput.tsx";
import PhoneInput from "@components/ui/forms/PhoneInput.tsx";
import TextAreaInput from "@components/ui/forms/TextAreaInput.jsx";

interface Props {
  formSubTitle: string;
}

export default ({ formSubTitle }: Props) => {
  const [value, setValue] = useState<Store>(rsvpStore.getState());
  const [browser, setBrowser] = useState<Browser>(browserStore.getState());
  useEffect(() => {
    const unsubscribe = rsvpStore.subscribe((state) => {
      setValue(state);
    });
    const unsubscribeBrowser = browserStore.subscribe((state) => {
      setBrowser(state);
    });
    return () => {
      unsubscribe();
      unsubscribeBrowser();
    };
  }, []);
  const browserStorage = browserStore.getState();
  const rsvpStorage = rsvpStore.getState();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    browserStorage.setUnique(browser["unique"]);
    rsvpStorage.addReservation(value["rsvp"]);
    try {
      console.error("Sending API request");
      const bodyData = {
        rsvp_name: JSON.stringify({
          first: value.rsvp.NameFirst,
          last: value.rsvp.NameLast,
        }),
        rsvp_total: parseInt(value.rsvp.Total),
        rsvp_interests: value.rsvp.Interests,
        rsvp_whoami: browser["unique"],
        rsvp_network: {
          source: value.rsvp.Network,
          comment: value.rsvp.NetworkOther,
        },
        rsvp_contact: {
          email: value.rsvp.ContactEmail,
          phone: value.rsvp.ContactPhone,
        },
      };
      console.error(bodyData);
      const endpoint =
        "https://bivqb6ix45.execute-api.us-west-2.amazonaws.com/nerdfest-satx-rsvp";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      const responsePayload = await response.json();
      if (!response.ok) {
        throw new Error(
          `API Error! Status: ${response.status} ${responsePayload}`,
        );
      }
      await response.json();
      rsvpStorage.resetRsvp();
    } catch (err) {
      console.error("failed to send request", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NameFirstInput id="NameFirst" required />
          <NameLastInput id="NameLast" required />
        </div>
        <EmailInput id="ContactEmail" label="Email Address" required />
        <PhoneInput id="ContactPhone" label="Phone Number" required />
        <TextAreaInput id="Comment" label="Additional Comments or Notes" />
      </div>
      <div className="mt-3 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formSubTitle}
        </p>
      </div>

      <ContactIconBlock
        icon="question"
        heading="Expected Party Size"
        description="How big do you expect your party to be?"
      >
        <SelectInput
          stateKey="Total"
          id="Total"
          label="How many are ya..."
          options={["1", "2", "3", "4", "5", "6+"]}
          required
        />
      </ContactIconBlock>
      <ContactIconBlock
        icon="chatBubble"
        heading="Fav's"
        description="Which of the following event activities are you most interested in? [select all that apply]"
      >
        <Checkbox
          id="Interests"
          other
          otherKey="rsvp-other"
          options={[
            { label: "3D Printing in Action", id: "rsvp-event-3dprinting" },
            { label: "Comic Books", id: "rsvp-event-comics" },
            { label: "GAME PLAY: Dungeons & Dragons", id: "rsvp-games-dnd" },
            { label: "GAME PLAY: Pokemon", id: "rsvp-games-pokemon" },
            { label: "GAME PLAY: Magic", id: "rsvp-games-magic" },
            { label: "GAME PLAY: Team Yankee", id: "rsvp-games-teamyankee" },
            {
              label: "SPEAKER: Tabletop Games for Beginners",
              id: "rsvp-speaker-tabletop",
            },
            {
              label: "SPEAKER: Tips for Trading Card Grading & Selling",
              id: "rsvp-speaker-tradingcards",
            },
            {
              label: "SPEAKER: Top 5 Filaments",
              id: "rsvp-speaker-5filaments",
            },
            { label: "(Free) Raffle Giveaways", id: "rsvp-perks-raffle" },
            { label: "Other", id: "rsvp-other" },
          ]}
        />
      </ContactIconBlock>

      <ContactIconBlock
        icon="chatBubble"
        heading="How did you (first) hear about Nerd Fest + Expo?"
      >
        <SelectInput
          stateKey="Network"
          id="rsvp-network-selector"
          label="Who told ya..."
          other={true}
          options={[
            { key: "dragon", value: "Dragon's Lair Alamo Ranch" },
            { key: "facebookInterest", value: "Interest-Based Facebook Group" },
            {
              key: "facebookCommunity",
              value: "Local Community Facebook Group",
            },
            { key: "friend", value: "Friend" },
            { key: "other", value: "Other" },
          ]}
        />
      </ContactIconBlock>
      <div className="mt-4 grid">
        <SubmitButton title="Confirm RSVP" />
      </div>
    </form>
  );
};
