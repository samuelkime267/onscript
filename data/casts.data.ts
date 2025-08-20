import img1 from "@/assets/imgs/img-1.png";
import img2 from "@/assets/imgs/img-2.png";
import img3 from "@/assets/imgs/img-3.png";
import img4 from "@/assets/imgs/img-4.png";
import fashionImg from "@/assets/imgs/fashion.jpg";
import { daysFromNow } from "@/utils";
import { PostSchemaDataType } from "@/features/cast/schemas/cast.schema";

export const scheduledCasts: PostSchemaDataType[] = [
  {
    text: "People only drink matcha because it’s green. any other color would not work except maybe blue",
    status: "PUBLISHED",
    signerUuid: "123-2393",
    userId: "user-id",
    embeds: [
      {
        url: img1.src,
      },
      {
        url: img2.src,
      },
    ],
    scheduledAt: daysFromNow(3),
  },
  {
    text: "People only drink matcha because it’s green. any other color would not work except maybe blue",
    status: "SCHEDULED",
    signerUuid: "123-2393",
    userId: "user-id",
    embeds: [
      {
        url: img3.src,
      },
    ],
    scheduledAt: daysFromNow(8),
  },
  {
    text: "Check out my portfolio. https://samuelkime.netlify.app",
    status: "SCHEDULED",
    signerUuid: "123-2393",
    userId: "user-id",
    embeds: [
      {
        url: "https://samuelkime.netlify.app",
      },
    ],
    scheduledAt: daysFromNow(8),
  },
  {
    text: "Check out my neynar. https://neynar.com/",
    status: "SCHEDULED",
    signerUuid: "123-2393",
    userId: "user-id",
    embeds: [
      {
        url: "https://neynar.com/",
      },
    ],
    scheduledAt: daysFromNow(8),
  },
  {
    text: "Check out my Lusion. https://lusion.co/",
    status: "SCHEDULED",
    signerUuid: "123-2393",
    userId: "user-id",
    embeds: [
      {
        url: "https://lusion.co/",
      },
    ],
    scheduledAt: daysFromNow(8),
  },
  {
    text: "Check out my portfolio. https://samuelkime.netlify.app",
    status: "SCHEDULED",
    signerUuid: "123-2393",
    userId: "user-id",
    embeds: [
      {
        url: img4.src,
      },
      {
        url: "https://samuelkime.netlify.app",
      },
    ],
    scheduledAt: daysFromNow(8),
  },
  {
    text: "Fashionista like no other",
    status: "SCHEDULED",
    signerUuid: "123-2393",
    userId: "user-id",
    embeds: [
      {
        url: fashionImg.src,
      },
    ],
    scheduledAt: daysFromNow(1),
  },
];
