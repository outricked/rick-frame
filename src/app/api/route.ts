import { getFrameHtmlResponse, FrameRequest, getFrameMessage  } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';


interface StateSchema {
  counter: number;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest); 
  if (!isValid) {
    // skip validation for now
  }

  console.log("message:", message)
  console.log("state:", message?.state)
  console.log("serialized state:", message?.state.serialized)
  console.log("serialized action:", message?.raw.action)
  console.log("serialized action state:", message?.raw.action.state)
  const stateResponse = JSON.parse(message?.raw.action.state.serialized as string) as StateSchema

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
            target: "https://rick-frame-m413.vercel.app",
          },
        ],
        image: {
          src: "https://rick-frame-m413.vercel.app/attack.webp",
          aspectRatio: "1:1"
        },
        state: {
          counter: stateResponse.counter - 1
        },
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
              target: "https://rick-frame-m413.vercel.app",
            },
          ],
          image: {
            src:"https://rick-frame-m413.vercel.app/heal.webp",
            aspectRatio: "1:1"
          },
          state: {
            counter: stateResponse.counter + 1
          },
          postUrl: 'https://rick-frame-m413.vercel.app/api',
        }),
      );
  } else {
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
            target: "https://rick-frame-m413.vercel.app",
          },
        ],
        image: {
          src:"https://rick-frame-m413.vercel.app/dragon.webp",
          aspectRatio: "1:1"
        },
        state: {
          counter: stateResponse.counter
        },
        postUrl: 'https://rick-frame-m413.vercel.app/api',
      }),
    );
  }
}
   
export async function POST(req: NextRequest): Promise<Response> {
  console.log("beginning request")
  return getResponse(req);
}