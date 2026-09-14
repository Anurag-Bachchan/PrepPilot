const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth_middle");
const upload=require("../middlewares/file_middle");
const {generateInterviewReportController, getInterviewReportById, getAllInterviewReports, generateResumePdfController}=require("../controllers/interview_controller")


/**
 * @route POST /api/interview/generate
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
router.post("/generate",authMiddleware,upload.single("resume"),generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
router.get("/reports/:interviewId",authMiddleware,getInterviewReportById);

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
router.get("/reports",authMiddleware,getAllInterviewReports);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
router.post("/resume/pdf/:interviewReportId", authMiddleware, generateResumePdfController)

module.exports=router;