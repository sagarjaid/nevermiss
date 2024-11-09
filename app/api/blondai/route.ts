// Import required modules
import { NextResponse } from 'next/server';
import axios from 'axios';

// Export a named function for handling POST requests
export async function POST(request: Request) {
  try {
    // Disable caching
    const headers = new Headers();
    headers.set('Cache-Control', 'no-store');

    // Define headers
    const apiHeaders = {
      Authorization: process.env.NEXT_PUBLIC_BLOND_AUTH,
    };

    // const data: Record<string, any> = {
    //   phone_number: '+918898720799',
    //   task: 'Act as Gym couch and remind caller to go to the gym and track the progress. Remind me to go to the gym and track my progress by asking questions like are you hitting the gym today? what exercise you did do on the last day? what are you playing today? wish me the best day wait for 2 seconds and hangup the call.',
    //   language: 'en',
    //   voice: 'matt',
    // };

    // Define the data payload for the API call
    const data: Record<string, any> = {
      phone_number: '+918898720799',
      from: null,
      task: 'Act as Gym couch and remind caller to go to the gym and track the progress. Remind me to go to the gym and track my progress by asking questions like are you hitting the gym today? what exercise you did do on the last day? what are you playing today? wish me the best day wait for 2 seconds and hangup the call.',
      model: 'enhanced',
      language: 'en',
      voice: 'matt',
      voice_settings: {},
      pathway_id: null,
      local_dialing: false,
      max_duration: '4',
      answered_by_enabled: false,
      wait_for_greeting: false,
      record: false,
      amd: false,
      interruption_threshold: 100,
      voicemail_message: null,
      background_track: 'none',
      voicemail_action: 'hangup',
      temperature: null,
      transfer_phone_number: null,
      transfer_list: {},
      metadata: null,
      pronunciation_guide: [],
      start_time: null,
      request_data: {},
      tools: [],
      dynamic_data: [],
      analysis_preset: null,
      analysis_schema: {},
      webhook: null,
      calendly: {},
    };

    // Send POST request to the external API
    const response = await axios.post(
      'https://us.api.bland.ai/v1/calls',
      data,
      { headers: apiHeaders }
    );

    // Return the response as JSON
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error making the API call:', error);
    // Return error details as JSON with status 500
    return NextResponse.json(
      { error: 'Failed to make the API call', details: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';

// // This is an example of a Next.js 14 API route using the new app router.
// export async function GET() {
//   return NextResponse.json({ message: 'Hello from Next.js API Route!' });
// }
