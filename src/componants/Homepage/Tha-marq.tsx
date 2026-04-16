import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import Image from "next/image";

const reviews = [
  {
    name: "Ahmed Al-Mansouri",
    username: "@ahmed_m",
    body: "Found my dream villa in Dubai through this platform. The process was seamless and the agent was incredibly helpful.",
    img: "/person1.png",
  },
  {
    name: "Seifeldeen ali",
    username: "@seifali",
    body: "Great experience buying an apartment in Abu Dhabi. The listings are accurate and the negotiation went smoothly.",
    img: "/person2.png",
  },
  {
    name: "Mohammed Khan",
    username: "@m_khan",
    body: "Sold my property faster than expected. The platform provided excellent visibility to serious buyers.",
    img: "/person3.png",
  },
  {
    name: "Omar ahmed",
    username: "@omar332",
    body: "Outstanding service! Rented a beautiful apartment in Marina. The team made everything easy and transparent.",
    img: "/person4.png",
  },
  {
    name: "Salaheldeen ali",
    username: "@salah213",
    body: "Excellent platform for real estate investment. Found multiple properties within my budget in prime locations.",
    img: "/person5.png",
  },
  {
    name: "Noureldeen ali",
    username: "@nour321",
    body: "Very satisfied with my purchase. The property inspection was thorough and all documents were handled professionally.",
    img: "/person6.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img  loading="lazy" className="rounded-full object-cover" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};


const Card = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
<div className="card w-100 p-8 bg-[#f3f5f7] dark:bg-gray-800 dark:border-gray-600 border border-[#ececec] rounded-2xl h-full">
    <BiSolidQuoteAltLeft className="text-blue-600" size={40} />
    <h1 className="font-semibold text-lg mt-3">
        {body}
    </h1>
    <div className="profile flex gap-3 items-center mt-5">
        <img loading="lazy" src={img} className="w-[35px] h-[35px] rounded-full object-cover" width={100} height={100} alt="" />
        <div className="text">
            <h1 className="font-semibold">{name}</h1>
            <span className="text-gray-700 text-[13px]">{username}</span>
        </div>
    </div>
</div>
)

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <Card key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <Card key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
