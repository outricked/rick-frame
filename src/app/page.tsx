import Image from "next/image";
import { FrameMetadata } from '@coinbase/onchainkit/frame';

export default function Home() {
  return (
    <FrameMetadata
      buttons={[
        {
          label: 'Attack',
        },
        {
          label: 'Heal',
        },
        {
          action: 'post_redirect',
          label: 'View',
          target: "https://rick-frame-m413.vercel.app/",
        },
      ]}
      image={{
       src: 'https://en.wikipedia.org/wiki/Dragon#/media/File:Friedrich-Johann-Justin-Bertuch_Mythical-Creature-Dragon_1806.jpg',
       aspectRatio: '1:1'
      }}
      input={{
        text: 'Tell me a boat story',
      }}
      state={{
        counter: 1,
      }}
      postUrl="https://rick-frame-m413.vercel.app/api"
    />
  );
}
