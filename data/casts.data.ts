import img1 from "@/assets/imgs/img-1.png";
import img2 from "@/assets/imgs/img-2.png";
import img3 from "@/assets/imgs/img-3.png";
import img4 from "@/assets/imgs/img-4.png";
import fashionImg from "@/assets/imgs/fashion.jpg";
import { daysFromNow } from "@/utils";

export const scheduledCasts = [
  {
    text: "People only drink matcha because it’s green. any other color would not work except maybe blue",
    scheduleDate: daysFromNow(2),
  },
  {
    text: "It's about on-chain summer, you know 🌞",
    scheduleDate: daysFromNow(5),
    imgs: [img1.src, img2.src, img3.src, img4.src],
  },
  {
    text: "Idea of the day: replace small talk with big questions. Your coffee shop line will never be boring again.",
    scheduleDate: daysFromNow(8),
  },
  {
    text: "Day 48 of building in public — hit my first 100 daily active users! 🚀",
    scheduleDate: daysFromNow(12),
    imgs: [img2.src],
  },
  {
    text: "If your design still works in black & white, you’ve nailed the fundamentals 🎨",
    scheduleDate: daysFromNow(15),
  },
  {
    text: "Trying out a no-phone morning routine for a week… wish me luck 😅",
    scheduleDate: daysFromNow(18),
    imgs: [fashionImg.src, img3.src, img4.src],
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is today 🌱",
    scheduleDate: daysFromNow(21),
  },
  {
    text: "I think Monday mornings need a rebrand. They’re just misunderstood Fridays in disguise.",
    scheduleDate: daysFromNow(27),
  },
  {
    text: "Mockups are the unsung heroes of design presentations. Sell the dream before the build.",
    scheduleDate: daysFromNow(34),
    imgs: [img1.src, fashionImg.src],
  },
  {
    text: "If AI writes your to-do list… is it still procrastination if you ignore it? 🤔",
    scheduleDate: daysFromNow(50),
  },
  {
    text: "Of course I had to slay",
    scheduleDate: daysFromNow(3),
    imgs: [fashionImg.src],
  },
];
