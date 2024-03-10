import Image from "next/image";
import { FrameMetadata } from '@coinbase/onchainkit/frame';
import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {

  return new NextResponse(
    // Step 3. Use getFrameHtmlResponse to create a Frame response
    getFrameHtmlResponse({
      buttons: [
        {
          label: `We love BOAT`,
        },
      ],
      image: 'https://build-onchain-apps.vercel.app/release/v-0-17.png',
      postUrl: 'https://build-onchain-apps.vercel.app/api/frame',
    }),
  );
}
 
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export default function Home() {
  return (
    <FrameMetadata
      buttons={[
        {
          label: 'Tell me the story',
        },
        {
          action: 'link',
          label: 'Link to Google',
          target: 'https://www.google.com'
        },
        {
          action: 'post_redirect',
          label: 'Redirect to cute pictures',
        },
      ]}
      image={{
       src: 'https://zizzamia.xyz/park-3.png',
       aspectRatio: '1:1'
      }}
      input={{
        text: 'Tell me a boat story',
      }}
      state={{
        counter: 1,
      }}
      postUrl="https://rick-frame-m413.vercel.app"
    />
  );
}
