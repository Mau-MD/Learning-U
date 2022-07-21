import Parse from "parse/node";

export const createFeedback = (videoId: string, feedback: number) => {
  const Feedback = new Parse.Object("Feedback");
  Feedback.set("videoId", videoId);
  Feedback.set("feedback", feedback);
  return Feedback;
};

export const updateFeedback = async (
  videoId: string,
  amountToIncrement: number
) => {
  const feedback = await getFeedbackByVideoId(videoId);

  if (!feedback || feedback.length === 0) {
    const newFeedbackObject = createFeedback(videoId, amountToIncrement);
    return await newFeedbackObject.save();
  }

  feedback[0].increment("feedback", amountToIncrement);
  return await feedback[0].save();
};

export const getFeedbackByVideoId = async (videoId: string) => {
  const Feedback = Parse.Object.extend("Feedback");
  const query = new Parse.Query(Feedback);

  query.equalTo("videoId", videoId);
  const feedback = await query.find();
  return feedback;
};
