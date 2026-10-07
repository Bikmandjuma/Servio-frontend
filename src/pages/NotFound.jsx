import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-content py-28 text-center">
      <p className="font-display text-6xl font-extrabold text-fg">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-fg">This page took a wrong turn.</h1>
      <p className="mt-2 text-muted">Let's get you back to something useful.</p>
      <Button to="/" variant="primary" className="mt-8 inline-flex">
        Back to home
      </Button>
    </div>
  );
}
