import ToggleSection from "./toggleSection";

const ToggleSections = ({
  visaOfficerResponseText,
  visaOfficerFeedbackText,
  visaOfficerSampleResponseText,
  officerToggle,
  setOfficerToggle,
  handleOfficerToggle,
  handleTextToSpeech,
  isSpeaking,
  feedbackToggle,
  setFeedbackToggle,
  handleFeedbackToggle,
  responseToggle,
  setResponseToggle,
  handleResponseToggle,
}) => {
  return (
    <>
      <ToggleSection
        title="Visa officer response"
        content={
          visaOfficerResponseText
            ? visaOfficerResponseText
            : "Answer the above question by pressing red micro-phone icon and receive a response from visa officer"
        }
        isToggled={officerToggle}
        setToggle={setOfficerToggle}
        onToggle={handleOfficerToggle}
        handleTextToSpeech={handleTextToSpeech}
        isSpeaking={isSpeaking}
        lastToggle={false}
      />
      <ToggleSection
        title="Feedback"
        content={
          visaOfficerFeedbackText
            ? visaOfficerFeedbackText
            : "Answer the above question by pressing red micro-phone icon and receive a negative or positive feedback on your answer from visa officer."
        }
        isToggled={feedbackToggle}
        setToggle={setFeedbackToggle}
        onToggle={handleFeedbackToggle}
        handleTextToSpeech={handleTextToSpeech}
        isSpeaking={isSpeaking}
        lastToggle={false}
      />
      <ToggleSection
        title="Sample response"
        content={
          visaOfficerSampleResponseText
            ? visaOfficerSampleResponseText
            : "Answer the above question by pressing red micro-phone icon to get to know how exactly you should answer this question directly from the visa officer."
        }
        isToggled={responseToggle}
        setToggle={setResponseToggle}
        onToggle={handleResponseToggle}
        handleTextToSpeech={handleTextToSpeech}
        isSpeaking={isSpeaking}
        lastToggle={true}
      />
    </>
  );
};

export default ToggleSections;
