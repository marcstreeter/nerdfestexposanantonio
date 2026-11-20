import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";

interface Props {
  entries: { question: string; answerHtml: string }[];
  review?: boolean;
}

export default function FAQAccordion({ entries, review = false }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={entries.length ? "faq-0" : undefined}
      className={
        review
          ? "divide-y divide-border"
          : "divide-y divide-neutral-200 dark:divide-neutral-700"
      }
    >
      {entries.map(({ question, answerHtml }, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="border-b-0 pb-3 [&:not(:first-child)]:pt-6"
        >
          <AccordionTrigger
            className={
              review
                ? "min-h-11 gap-3 text-balance text-base font-bold text-foreground hover:no-underline focus-visible:ring-2 focus-visible:ring-ring md:text-lg [&>svg]:size-5 [&>svg]:text-muted-foreground"
                : "gap-3 text-balance rounded-lg pb-3 pt-0 text-base font-bold text-neutral-800 ring-zinc-500 hover:text-neutral-500 hover:no-underline focus-visible:ring dark:text-neutral-200 dark:ring-zinc-200 dark:hover:text-neutral-400 md:text-lg [&>svg]:size-5 [&>svg]:text-neutral-600 dark:[&>svg]:text-neutral-400"
            }
          >
            {question}
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <p
              className={
                review
                  ? "text-pretty text-base leading-relaxed text-muted-foreground"
                  : "text-pretty text-base text-neutral-600 dark:text-neutral-400"
              }
              dangerouslySetInnerHTML={{ __html: answerHtml }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
