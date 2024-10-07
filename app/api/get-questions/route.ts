// app/api/get-questions/route.ts
import { interviewQuestions } from '@/components/helper/questions';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

// The GET method for your API route
export async function GET(req: Request) {
  const systemPrompt = `
You are a visa officer who plans to ask questions to the student to determine following things

Visa Officer mindset to reject student:

1. Are you a genuine student?
2. Are you a positional immigrant?
3. Do you have correct finances in order to study in USA?

Interview factors:

1. University and Study Plans
2. Academics history
3. Student Finances
4. If, Work experience
5. Post Graduation Plans
6. Other Questions

NOTE: consider user doesn’t have any work experience.

You have access to interviewQuestions. Create an object that balances the questions so that Visa Officer's mindset is to either reject or accept the student for the USA visa interview.

Output the result in balancedInterviewQuestionsArr in the following JSON format only. You can ask a maximum total of 9 questions.

{
  "balancedInterviewQuestionsArr": [
    { "questionNumber": 1, "question": "Q1", "questionCategory": "universityAndStudyPlans/academicsHistory/studentFinances/workExperience/postGraduationPlans/otherQuestions" },
    { "questionNumber": 2, "question": "Q2", "questionCategory": "universityAndStudyPlans/academicsHistory/studentFinances/workExperience/postGraduationPlans/otherQuestions" },
    ...
  ]
};
`;

  try {
    // Call the OpenAI API to generate visa interview questions
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: JSON.stringify(interviewQuestions),
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 850,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Extract the content from the API response
    const responseData = response.choices[0]?.message?.content;

    if (!responseData) {
      throw new Error('Invalid response from OpenAI');
    }

    // Return the result as JSON
    return NextResponse.json({ result: responseData });
  } catch (error) {
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json({ result: error.message }, { status: 500 });
  }
}
