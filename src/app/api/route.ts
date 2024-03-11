import { getFrameHtmlResponse, FrameRequest, getFrameMessage  } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';


const frame_url = process.env.FRAME_URL as string;
const api_url = frame_url+"api";
const dragon_url = frame_url+"dragon.wepb";
const attack_url = frame_url+"attack.wepb";
const heal_url = frame_url+"heal.wepb";

interface StateSchema {
  counter: number;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest); 
  if (!isValid) {
    console.log("not valid")
  }

  console.log("message:", message)
  console.log("raw:", message?.raw)

  if (message?.button == 1){
    await kv.incr("dragon_health")
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
            target: api_url,
          },
        ],
        image: {
          src: attack_url,
          aspectRatio: "1:1"
        },
        postUrl: api_url,
      }),
    );
  } else if (message?.button == 2) {
      kv.decr("dragon_health")
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
              target: api_url,
            },
          ],
          image: {
            src: heal_url,
            aspectRatio: "1:1"
          },
          postUrl: api_url,
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
            target: api_url,
          },
        ],
        image: {
          src: dragon_url,
          aspectRatio: "1:1"
        },
        postUrl: api_url,
      }),
    );
  }
}
   
export async function POST(req: NextRequest): Promise<Response> {
  console.log("beginning request")
  return getResponse(req);
}