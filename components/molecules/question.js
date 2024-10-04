import Image from 'next/image';

const Question = ({
  questionNumber,
  question,
  handleTextToSpeech,
  isSpeaking,
}) => {
  return (
    <div className='flex justify-between gap-2 border-b p-4'>
      <div className='flex items-start gap-1.5 font-semibold sdm:items-center'>
        <div>Q{questionNumber}:</div>
        <div>{question}</div>
      </div>
      <div className='flex items-center gap-2'>
        <div
          onClick={() => !isSpeaking && handleTextToSpeech(question)}
          className={`${
            isSpeaking ? 'cursor-not-allowed' : 'cursor-pointer'
          } w-fit`}>
          {isSpeaking ? (
            <Image
              alt='wave'
              src='/wave-2.gif'
              width={25}
              height={25}
            />
          ) : (
            <Image
              alt='speaker on'
              src='/speaker-on.svg'
              width={25}
              height={25}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
