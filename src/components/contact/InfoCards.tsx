import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { contactInfoCards, siteConfig } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
};

const toneClasses = {
  green: "bg-soft-green text-green-deep",
  blue: "bg-soft-blue text-blue",
};

export function InfoCards() {
  return (
    <Container as="section" className="pb-2.5 pt-11">
      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfoCards.map((card) => {
          const Icon = iconMap[card.icon];
          return (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block rounded-[20px] border border-navy/[0.08] aj-card p-6 transition-shadow hover:shadow-[0_22px_44px_-26px_rgba(12,46,110,0.4)]"
            >
              <span className={`mb-3.5 flex h-12 w-12 items-center justify-center rounded-[14px] ${toneClasses[card.tone]}`}>
                <Icon className="h-6 w-6" strokeWidth={1.9} />
              </span>
              <h3 className="mb-1 font-heading text-base font-bold text-navy">{card.title}</h3>
              {card.lines.map((line) => (
                <p key={line} className="font-body text-[13px] leading-snug text-muted">
                  {line}
                </p>
              ))}
            </a>
          );
        })}

        <div className="rounded-[20px] bg-navy p-6">
          <span className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-[14px] bg-green-bright/[0.18] text-green-bright">
            <Clock className="h-6 w-6" strokeWidth={1.9} />
          </span>
          <h3 className="mb-1 font-heading text-base font-bold text-white">Opening Hours</h3>
          <p className="font-body text-[13px] leading-snug text-white/72">
            Consultations {siteConfig.hoursShort}
            <br />
            <span className="font-semibold text-green-bright">{siteConfig.roundTheClock}</span>
          </p>
        </div>
      </div>
    </Container>
  );
}
