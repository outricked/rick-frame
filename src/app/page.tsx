import { FrameMetadata } from '@coinbase/onchainkit/frame';


const frame_url = process.env.FRAME_URL as string;
const api_url = frame_url+"api";
const dragon_url = frame_url+"dragon.wepb";

export default function Home() {
  console.log("home")
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
          target: frame_url,
        },
      ]}
      image={{
       src: dragon_url,
       aspectRatio: '1:1'
      }}
      postUrl={api_url}
    />
  );
}
