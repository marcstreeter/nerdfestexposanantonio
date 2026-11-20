import React, { useEffect, useState } from "react";
import { rsvpStore } from "@/stores/rsvp";
import { browserStore } from "@/stores/uuid.ts";
import { Button } from "@/components/ui/shadcn/button";
import { Card } from "@/components/ui/shadcn/card";
import SelectInput from "./SelectedInput.tsx";
import { boardGameHost, expoSpeaker, livePrinting } from "./volunteer-roles";
import NameFirstInput from "@components/ui/forms/NameFirstInput.tsx";
import NameLastInput from "@components/ui/forms/NameLastInput.tsx";
import Checkbox from "@components/ui/forms/Checkbox.tsx";
import EmailInput from "@components/ui/forms/EmailInput.tsx";
import PhoneInput from "@components/ui/forms/PhoneInput.tsx";
import TextAreaInput from "@components/ui/forms/TextAreaInput.tsx";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    const url = new URL(location.href);
    const role = url.searchParams.get("volunteer");
    if (
      !role ||
      ![boardGameHost, expoSpeaker, livePrinting].some(({ id }) => id === role)
    )
      return;

    const { rsvp, setRsvp } = rsvpStore.getState();
    if (!rsvp.Interests.includes(role)) {
      setRsvp({ ...rsvp, Interests: [...rsvp.Interests, role] });
    }
    url.searchParams.delete("volunteer");
    history.replaceState(history.state, "", url);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const { rsvp, addReservation, resetRsvp } = rsvpStore.getState();
    setStatus("sending");

    try {
      const bodyData = {
        rsvp_name: JSON.stringify({
          first: rsvp.NameFirst,
          last: rsvp.NameLast,
        }),
        rsvp_total: Number(rsvp.Total),
        rsvp_interests: rsvp.Interests,
        rsvp_whoami: browserStore.getState().unique,
        rsvp_network: {
          source: rsvp.Network,
          comment: rsvp.Network === "other" ? rsvp.NetworkOther : "",
        },
        rsvp_contact: {
          email: rsvp.ContactEmail,
          phone: rsvp.ContactPhone,
          comment: rsvp.Comment,
          other_activity: rsvp.Interests.includes("rsvp-other")
            ? rsvp.InterestsOther
            : undefined,
          other_volunteer_role: rsvp.Interests.includes("volunteer-other")
            ? rsvp.VolunteerOther
            : undefined,
        },
      };
      const endpoint =
        "https://bivqb6ix45.execute-api.us-west-2.amazonaws.com/nerdfest-satx-rsvp";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      if (!response.ok) {
        throw new Error(`Signup request failed with status ${response.status}`);
      }
      addReservation(rsvp);
      resetRsvp();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => {
        if (status === "sent" || status === "error") setStatus("idle");
      }}
    >
      <fieldset className="signup-fields" disabled={status === "sending"}>
        <Card
          role="region"
          className="signup-card"
          aria-labelledby="signup-details"
        >
          <h2 id="signup-details">Your details</h2>
          <p className="muted">
            We use your details to plan the expo and contact you about your
            signup.
          </p>
          <div className="signup-contact">
            <NameFirstInput id="NameFirst" required />
            <NameLastInput id="NameLast" required />
            <EmailInput id="ContactEmail" label="Email address" required />
            <PhoneInput id="ContactPhone" label="Phone number" required />
            <SelectInput
              stateKey="Total"
              id="Total"
              label="Party size"
              options={["1", "2", "3", "4", "5"]}
              required
            />
          </div>
        </Card>
        <Card
          role="region"
          className="signup-card"
          aria-labelledby="signup-activities"
        >
          <h2 id="signup-activities">Activity interests</h2>
          <p className="muted">
            Select any activities you’d like to see or play.
          </p>
          <Checkbox
            id="Interests"
            other
            otherKey="rsvp-other"
            otherLabel="Other activity interest"
            options={[
              { label: "3D Printing in Action", id: "rsvp-event-3dprinting" },
              { label: "Comic Books", id: "rsvp-event-comics" },
              { label: "Dungeons & Dragons", id: "rsvp-games-dnd" },
              { label: "Pokémon", id: "rsvp-games-pokemon" },
              { label: "Magic", id: "rsvp-games-magic" },
              { label: "Team Yankee", id: "rsvp-games-teamyankee" },
              {
                label: "Tabletop Games for Beginners",
                id: "rsvp-speaker-tabletop",
              },
              {
                label: "Tips for Trading Card Grading & Selling",
                id: "rsvp-speaker-tradingcards",
              },
              {
                label: "Top 5 Filaments",
                id: "rsvp-speaker-5filaments",
              },
              { label: "Free raffle giveaways", id: "rsvp-perks-raffle" },
              { label: "Other", id: "rsvp-other" },
            ]}
          />
        </Card>
        <Card
          role="region"
          className="signup-card"
          aria-labelledby="signup-volunteering"
        >
          <h2 id="signup-volunteering">Volunteer opportunities</h2>
          <p className="muted">
            Optional. Choose any roles you’d like to help with.
          </p>
          <Checkbox
            id="Interests"
            other
            otherKey="volunteer-other"
            otherField="VolunteerOther"
            otherLabel="Other volunteer role"
            options={[
              boardGameHost,
              expoSpeaker,
              { label: "Setup", id: "volunteer-setup" },
              { label: "Take down", id: "volunteer-take-down" },
              { label: "Raffle desk", id: "volunteer-raffle-desk" },
              { label: "Popcorn machine", id: "volunteer-popcorn-machine" },
              {
                label: "TriForce Challenge (family friendly cosplay)",
                id: "volunteer-triforce-challenge",
              },
              {
                label: "D&D Dungeon Master",
                id: "volunteer-dnd-dungeon-master",
              },
              livePrinting,
              { label: "Other", id: "volunteer-other" },
            ]}
          />
        </Card>
        <Card
          role="region"
          className="signup-card"
          aria-labelledby="signup-more"
        >
          <h2 id="signup-more">Anything else?</h2>
          <div className="signup-extra">
            <SelectInput
              stateKey="Network"
              id="rsvp-network-selector"
              label="How did you hear about Nerd Fest + Expo?"
              other
              otherLabel="Other referral source"
              options={[
                { key: "dragon", value: "Dragon's Lair Alamo Ranch" },
                {
                  key: "facebookInterest",
                  value: "Interest-Based Facebook Group",
                },
                {
                  key: "facebookCommunity",
                  value: "Local Community Facebook Group",
                },
                { key: "friend", value: "Friend" },
                { key: "other", value: "Other" },
              ]}
            />
            <TextAreaInput id="Comment" label="Additional comments or notes" />
          </div>
        </Card>
        <div className="signup-action">
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Confirm signup"}
          </Button>
        </div>
      </fieldset>
      <p className="signup-status" role="status">
        {status === "sent" && "Thanks! We received your signup."}
        {status === "error" &&
          "We couldn’t send your signup. Your answers are still here. Please try again."}
      </p>
    </form>
  );
}
