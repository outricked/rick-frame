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
          target: "https://rick-frame-m413.vercel.app",
        },
      ]}
      image={{
       src: "https://rick-frame-m413.vercel.app/dragon.webp",
       aspectRatio: '1:1'
      }}
      state={{
        counter: 100000,
      }}
      postUrl="https://rick-frame-m413.vercel.app/api"
    />
  );
}
