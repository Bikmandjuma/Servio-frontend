import { business } from "../data/business";

export default function Privacy() {
  return (
    <div className="container-content py-16 lg:py-24 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-fg">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 2026</p>

      <div className="mt-10 space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-fg">Information we collect</h2>
          <p className="mt-2">
            When you contact Servio, request a quote, or request a demo, we collect the details you
            provide, such as your name, company, phone number, email and business type, so we
            can respond to your request.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-fg">How we use it</h2>
          <p className="mt-2">
            We use this information only to follow up on your request, provide quotes, schedule
            demos, and improve the products and support we offer. We do not sell your information.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-fg">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent to {business.email} or {business.phoneDisplay}.
          </p>
        </section>
      </div>
    </div>
  );
}
