import { BookCTA } from "@/components/sections/BookCTA";

export default function BookPage() {
  return (
    <div className="pt-[calc(5.25rem+env(safe-area-inset-top))] pb-8 sm:pt-32">
      <BookCTA overlap={false} />
    </div>
  );
}
