import React, { useEffect, useState } from "react";
import { VscGear } from "react-icons/vsc";
import { ROUTES } from "../utils/routes";
import { loadData } from "../utils/localStorage";
import { postChatGPTMessage } from "../utils/chatGPTUtil";

function Generator({ setPage, resume, openAIKey }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const fetchJobDescription = async () => {
      const fetchedJob = await loadData("jobDescription");
      setJobDescription(fetchedJob);
    };
    fetchJobDescription();
  }, []);

  const generateCoverLetter = async () => {
    setIsLoading(true);
    try {
      const message = `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\n\nJob Description:\n${jobDescription}`;
      const chatGPTResponse = await postChatGPTMessage(message, openAIKey);
      setCoverLetter(chatGPTResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mx-5 my-3 items-center">
        <button
          onClick={() => generateCoverLetter()}
          className="border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold"
        >
          {isLoading ? "Generating" : "Generate"}
        </button>
        <h2 className="text-2xl font-bold">LinkedIn Cover Letter Generator</h2>
        <button
          onClick={() => {
            setPage(ROUTES.PROFILE);
          }}
          className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover"
        >
          <VscGear />
        </button>
      </div>
      <div className="flex mx-5">
        <textarea
          rows={12}
          className="w-full"
          placeholder="Generated cover letter"
          value={coverLetter}
        />
      </div>
    </div>
  );
}

export default Generator;
