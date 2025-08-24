const catchasyncerror = require("../middleware/catchAsyncError");
const Form = require("../models/formModal");

exports.createnewquery = catchasyncerror(async (req, res) => {
    const { name,email,subject,message } = req.body;
    if(!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }
    const form = await Form.create({
        name,
        email,
        subject,
        message
    });
    res.status(201).json({
        success: true,
        form,
    });
});
