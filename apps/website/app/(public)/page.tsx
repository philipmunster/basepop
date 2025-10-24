export default function HomePage() {
  return (
      <div className="flex flex-col gap-2">
        <h1>Im the frontpage</h1>
        <a href="/auth/login">login</a>
        <a href="/auth/sign-up">sign up</a>
      </div>
  );
}
