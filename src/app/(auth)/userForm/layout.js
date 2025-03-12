import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function UserFormLayout({ children }) {
  return (
    <section>
      <div className="flex justify-center items-center h-screen">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton className="border-2 border-black" />
        </SignedIn>
        {children}
      </div>
    </section>
  );
}
