import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export const POST = async (request) => {
  const { moodData } = await request.json();
  // console.log(moodData);

  const processedMoodData = {};
  for (const year in moodData) {
    processedMoodData[year] = {};
    for (const month in moodData[year]) {
      const oneIndexedMonth = parseInt(month) + 1; // Convert 0-indexed to 1-indexed
      processedMoodData[year][oneIndexedMonth] = moodData[year][month];
    }
  }
  console.log(processedMoodData);

  try {
    const moodModel = {
      positive: {
        header: "",
        description: "",
      },
      negative: {
        header: "",
        description: "",
      },
      info: {
        header: "",
        description: "",
      },
    };
    const prompt = `I am giving you a moodData object. The structure is { year: { month: { day: moodValue } } }. The months are 0-indexed.
      The mood values are from 1 to 6 for cheerful, happy, normal, angry, sad, depressed, respectively.

      Here is the moodData: ${JSON.stringify(processedMoodData)}.

      Here is a mood model that contains possible insights:
      ${JSON.stringify(moodModel, null, 2)}
    
      the header should contain maximum of 4 words and the description should contain maximum of 100 characters.
      do not send any blank header or description for any of the insights. send something meaningful.
      Analyze the moodData and identify ALL relevant insights from the mood model and provide meaningful analysis from the whole data that highlights important mood insights. Return a JSON object where each key is a category from the mood model (positive, negative, or info) and the value is the corresponding insight.
       Return ONLY the JSON object.
       Do not add any additional text or explanations outside of the JSON object
      .Do not include any additional text, backticks, or formatting. Just the JSON.`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    // console.log(result.response.text());

    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        const parsedData = JSON.parse(jsonString);

        return new NextResponse(JSON.stringify(parsedData), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        throw new Error("No JSON object found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      console.error("Raw response text:", responseText);
      return new NextResponse(
        JSON.stringify({ error: "Failed to parse AI response" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in AI response:", error);
    return new NextResponse(JSON.stringify({ error: "Error in AI response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
