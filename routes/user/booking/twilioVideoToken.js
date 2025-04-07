import Twilio from 'twilio';  // Default import for Twilio
import  {insertNewDocument}  from '../../../helpers/index.js';
const { AccessToken } = Twilio.jwt;
const VideoGrant = AccessToken.VideoGrant;

const twilioToken = async (req, res) => {
  console.log("checkin");

  try {
    // Get userId and videoRoomName from the request body
    const { userId, videoRoomName } = req.body;
    console.log(req.body, "body");
    console.log(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      "env"
    );

    // Create the token with required credentials and user identity
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      { identity: userId }  // Use 'identity' for user identification
    );

    console.log(token, "token");

    // Create a VideoGrant for the specified room
    const videoGrant = new VideoGrant({
      room: videoRoomName  // Correct parameter is 'room'
    });

    console.log(videoGrant, "videoGrant");

    // Add the grant to the token
    token.addGrant(videoGrant);
    console.log("in");

    // Generate the JWT token
    const jwt = token.toJwt();
    console.log(jwt, "jwt");

    const insertServiceDetails = await insertNewDocument("serviceDetail",{...req.body,token: jwt})
    // Return the token as JSON
    return res.json({status:201, token: jwt });

  } catch (error) {
    console.error("Error generating Twilio token:", error);
    return res.status(500).json({ error: "Failed to generate token" });
  }
};

export default twilioToken;
