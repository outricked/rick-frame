import { getFrameHtmlResponse, FrameRequest, getFrameMessage  } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest); 
  if (!isValid) {
    // skip validation for now
  }
  
  if (message?.button == 1){
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
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
        ],
        image: "https://rick-frame-m413.vercel.app/attack.webp",
        postUrl: 'https://rick-frame-m413.vercel.app/api',
      }),
    );
  } else if (message?.button == 2) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
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
          ],
          image: "https://rick-frame-m413.vercel.app/heal.webp",
          postUrl: 'https://rick-frame-m413.vercel.app/api',
        }),
      );
  } else {
    return new NextResponse(
      //  https://bg3.wiki/w/images/d/d5/Extra_Attack.webp
      getFrameHtmlResponse({
        buttons: [
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
        ],
        image:  "https://rick-frame-m413.vercel.app/dragon.webp",
        postUrl: 'https://rick-frame-m413.vercel.app/api',
      }),
    );
  }
}
   
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}