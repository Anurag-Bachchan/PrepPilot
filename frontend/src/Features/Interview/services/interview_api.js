import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,//it makes sure that the cookies are sent with the request
})

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */

export async function generateInterviewReport({jobDescription, selfDescription, resumeFile}){
    const formData=new FormData();//create a new FormData object to hold the data to be sent in the request because
    //resume file is a binary file and cannot be sent as JSON. FormData allows us to send files and data together in a single request.
    formData.append("jobDescription",jobDescription);
    formData.append("selfDescription",selfDescription);
    formData.append("resume",resumeFile);

    try{
         
        const response=await api.post("/api/interview/generate", formData, {
            headers: {
                "Content-Type": "multipart/form-data"//set the content type to multipart/form-data so that the server knows how to parse the request
            }
         })
         
        return response.data

    }catch(error){
        throw error.response.data; 
    }
}

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    try{
        const response = await api.get(`/api/interview/reports/${interviewId}`)
        return response.data
    }catch(err){
        throw err;
    }
}


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    try{
         const response = await api.get("/api/interview/reports")
         return response.data

    }catch(err){
        throw err;
    }
}


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}