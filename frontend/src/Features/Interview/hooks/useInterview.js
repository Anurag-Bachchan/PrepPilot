import {generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf} from "../services/interview_api";
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview_context";
import { useParams } from "react-router";
import { useToast } from "../../../Shared/toast_context";
import { getErrorMessage } from "../../../Shared/getErrorMessage";

export const useInterview=()=>{
    const context=useContext(InterviewContext);
    const { interviewId }= useParams();

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context
    const { showToast } = useToast()

    const generateReport=async({jobDescription, selfDescription, resumeFile})=>{
        setLoading(true)
        let response=null;

        try{
            response=await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setReport(response.interviewReport);
        }catch(error){
            showToast(getErrorMessage(error, "Failed to generate interview report."));
        }finally{
            setLoading(false)
        }
        return response;
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            showToast(getErrorMessage(error, "Failed to load interview report."))
        } finally {
            setLoading(false)
        }
        return response?.interviewReport ?? null
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            showToast(getErrorMessage(error, "Failed to load interview reports."))
        } finally {
            setLoading(false)
        }

        return response
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            showToast(getErrorMessage(error, "Failed to generate resume PDF."))
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(()=>{//used to get the report using id so that after refresh the data get fetched intially so that it 
        //does not get blank after refresh
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    },[interviewId])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf};
}