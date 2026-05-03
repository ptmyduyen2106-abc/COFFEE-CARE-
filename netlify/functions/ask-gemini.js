const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  // 1. Đổi GEMINI_API_KEY thành COFFEE_CARE (vì hôm trước trên Netlify bạn đặt tên biến này là COFFEE_CARE)
  const genAI = new GoogleGenerativeAI(process.env.COFFEE_CARE);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
  
  try {
    const { prompt } = JSON.parse(event.body);
    const result = await model.generateContent(
      "Bạn là chuyên gia cà phê Việt Nam. Trả lời ngắn gọn bằng tiếng Việt.\n\n" + prompt
    );
    
    return {
      statusCode: 200,
      // 2. Đổi chữ 'text' thành 'reply' để khớp với code file HTML đang chờ nhận
      body: JSON.stringify({ reply: result.response.text() }), 
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Lỗi kết nối AI: " + error.message }),
    };
  }
};
