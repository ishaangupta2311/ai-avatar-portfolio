// // src/app/api/ai/generate-sound/route.js
// import { textToSpeech } from "@huggingface/inference";
// import { NextResponse } from "next/server";



// export async function POST(req) {
//   const tts = new textToSpeech({
//     model: "myshell-ai/MeloTTS-English",
//     inputs: text,
//   });
//   // try {
//   //   const { text } = await req.json();

//   //   const response = await fetch(
//   //     "https://api-inference.huggingface.co/models/myshell-ai/MeloTTS-English",
//   //     {
//   //       headers: {
//   //         Authorization: `Bearer ${process.env.HF_TOKEN}`,
//   //         "Content-Type": "application/json",
//   //       },
//   //       method: "POST",
//   //       body: JSON.stringify({ inputs: text }),
//   //     }
//   //   );

//   //   if (!response.ok) {
//   //     throw new Error(`HTTP error! status: ${response.status}`);
//   //   }

//   //   const audioBuffer = await response.arrayBuffer();

//   //   return new NextResponse(audioBuffer, {
//   //     status: 200,
//   //     headers: {
//   //       "Content-Type": "audio/wav",
//   //       "Content-Length": audioBuffer.byteLength.toString(),
//   //     },
//   //   });
//   // } catch (error) {
//   //   console.log(error);
//   //   // console.error("Error in TTS API:", error);
//   //   // return NextResponse.json(
//   //   //   { error: "Error generating speech" },
//   //   //   { status: 500 }
//   //   // );
//   // }
// }
