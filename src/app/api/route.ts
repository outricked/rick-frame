import { getFrameHtmlResponse, FrameRequest, getFrameMessage  } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';


const frame_url = process.env.FRAME_URL as string;
const api_url = frame_url+"api";
const dragon_url = frame_url+"dragon.webp";
const attack_url = frame_url+"attack.webp";
const heal_url = frame_url+"heal.webp";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest); 
  if (!isValid) {
    console.log("not valid")
  }

  const dragon_health = await kv.get("dragon_health")
  if (dragon_health == null){
    console.log("dragon health is not set")
    await kv.set("dragon_health", 100000)
  } else {
    console.log("dragon health is set: ", dragon_health)
  }


  console.log("message:", message)
  console.log("raw:", message?.raw)

  if (message?.button == 1){
    const new_health = await kv.decr("dragon_health")
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
        state: {
          count: new_health
        },
        postUrl: api_url,
      }),
    );
  } else if (message?.button == 2) {
      const new_health = await kv.incr("dragon_health")
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
          state: {
            count: new_health
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