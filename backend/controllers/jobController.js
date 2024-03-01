import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async(req,res,next) =>{
    const jobs = await Job.find({ expired: false});
    res.status(200).json({
        success:true,
        jobs,
    });
});

export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resource",400));
    }

    const {title, description, category, country, city, location, fixedSalary, SalaryFrom, SalaryTo} = req.body;


    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please provide full job details",400));

    }
    if((!SalaryFrom || !SalaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please provide fixed salary or ranged salary"));
    }
    if(SalaryFrom && SalaryTo  && fixedSalary){
        return next(new ErrorHandler("Can not enter fixed salary and ranged salary together"));
    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, SalaryFrom, SalaryTo, postedBy
    })
    res.status(200).json({
        success:true,
        message:"job posted successfully",
        job
    })
});

export const getmyjobs = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resource",400));
    }
    const myjobs = await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myjobs,
    })
})

export const updateJob = catchAsyncError(async(req,res,next) =>{
    const {role} = req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resource",400));
    }

    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found",404)); 
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })
    res.status(200).json({
        success: true,
        job,
        message:"job updated successfully"
    });
})

export const deleteJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resource",400));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found",404)); 
    }

    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"job deleted successfully"
    })


})