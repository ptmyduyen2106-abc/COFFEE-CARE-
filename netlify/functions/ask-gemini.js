const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const { prompt } = JSON.parse(event.body);
  const result = await model.generateContent(
    "Bạn là chuyên gia cà phê Việt Nam. Trả lời ngắn gọn bằng tiếng Việt.\n\n" + prompt
  );
  return {
    statusCode: 200,
    body: JSON.stringify({ text: result.response.text() }),
  };
};