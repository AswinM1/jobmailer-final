import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.log("MongoDB connection error:", err);
});

// Middleware
app.use(cors({origin:'*'}));
app.use(express.json());

// User Schema for MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// User Model
const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    // Successful login
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Email type prompt templates
const emailPrompts = {
  Internship: `Generate a professional internship application email based on the information provided by the user. If the user mentions their name, college, field of study, target company, or other relevant details, incorporate these into the email. Use professional language and structure the email with a clear subject line, greeting, introduction, body explaining qualifications and interest, request for consideration, and a professional closing. If the user asks for edits, modify the email according to their specific needs. Ask for necessary information like name, company name, field of interest, and duration if not provided.

Sample template to adapt (do not use this verbatim):
Dear [Recipient's Name],

I am a [year] student at [College/University] studying [Field of Study]. I am writing to express my interest in a [Duration] internship opportunity in [Field/Department] at [Company Name].

[Paragraph about qualifications and why interested in this company]

[Paragraph about what you hope to gain and contribute]

I have attached my resume and portfolio for your consideration. Please feel free to contact me at [Email/Phone] if you require any additional information.

Thank you for considering my application.

Sincerely,
[Your Name]`,

  Followup: `Create a professional follow-up email for a job or internship application based on the user's input. Include details about the position applied for, when they applied, and reference any previous interactions if mentioned. The email should be concise, polite, and express continued interest in the position. Use appropriate formality and include a call to action. If the user asks for edits, adjust the tone and content accordingly. Ask for necessary information like company name, position applied for, and date of application if not provided.`,

  JobApplication: `Generate a formal job application email based on the user's provided information. Include details about the position being applied for, their qualifications, experience, and why they're interested in the role and company. Structure with a clear subject line, professional greeting, introduction stating the position, body highlighting relevant experience and skills, closing paragraph expressing interest in an interview, and professional signature. If the user asks for edits, tailor the email according to their specifications. Ask for necessary information like position title, company name, qualifications, and how they found the job listing if not provided.`,

  Resignation: `Create a professional resignation letter based on the user's input. Include their current position, company name, intended last day of work (typically 2 weeks notice), and reason for leaving if provided. The tone should be respectful, appreciative of the opportunities received, and offer assistance during the transition period. Structure with date, recipient details, formal greeting, resignation statement, notice period, transition details, expression of gratitude, and formal closing. If the user asks for edits, modify according to their needs. Ask for necessary information like position, company name, and intended last day if not provided.`,

  ThankYou: `Generate a sincere thank-you email based on the user's input. This could be following a job interview, after receiving help, or to express appreciation for an opportunity. The email should be warm, specific about what they're thankful for, and personalized to the recipient. Keep it concise but genuine. If the user asks for edits, adjust according to their specifications. Ask for necessary information like the recipient's name, what they're thanking them for, and any specific details they want to mention if not provided.`,

  Introduction: `Create a professional introduction email based on the user's input. This could be for networking, introducing themselves to a new team, or establishing a business connection. Include who they are, their background, the purpose of the connection, and a clear next step if applicable. The tone should be professional yet approachable, with appropriate level of detail based on the context. If the user asks for edits, modify according to their specifications. Ask for necessary information like their role, company, the recipient's details, and purpose of the introduction if not provided.`,

  RequestMeeting: `Generate a professional meeting request email based on the user's input. Include the purpose of the meeting, suggested times/dates, estimated duration, location (virtual or physical), and any preparation needed from participants. The tone should be professional and respectful of the recipient's time. Include a clear subject line and call to action. If the user asks for edits, adjust according to their needs. Ask for necessary information like meeting purpose, preferred times, and participants if not provided.`
};

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.KEY,
});

// Main Route for Processing Email Templates
app.post("/main", async (req, res) => {
  try {
    const { messages, outputType = "Internship" } = req.body.input;
    
    if (!messages) {
      return res.status(400).json({ error: "Message field is empty" });
    }
    
    // Log the incoming input for debugging
    console.log("User input:", req.body.input);
    console.log("Email type selected:", outputType);
    
    // Get the appropriate prompt template for the selected email type
    let promptTemplate = emailPrompts[outputType] || emailPrompts.Internship;
    
    // Combine the prompt template with the user's input
    const fullPrompt = `${promptTemplate}\n\nUser's input: ${messages}`;
    
    const responsechat = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: fullPrompt,
        },
      ],
      model: "llama3-8b-8192",
    });
    
    // Log the response for debugging
    console.log("Response from Groq:", responsechat);
    
    // Send the response back to the client
    res.status(200).json({ reply: responsechat });
  } catch (error) {
    console.error("Error occurred:", error.message, error.stack);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});