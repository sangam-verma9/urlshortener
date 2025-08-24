const catchasyncerror = require("../middleware/catchAsyncError");
const Url = require("../models/urlModal");
const XXH = require("xxhashjs");
function generateKey(url, size = 8) {
    const hash = XXH.h64(url, 0xABCD1234).toString(16);
    return hash.slice(0, size);
}

exports.createnewshorturl = catchasyncerror(async (req, res) => {
    const { value } = req.body;
    let key = generateKey(value);
    let exists = await Url.findOne({ key });
    if (exists) {
        return res.status(200).json({
            success: true,
            message: "Key already exists",
            url:exists
        });
    }
    const url = await Url.create({
        value: value,
        key: key,
    });
    res.status(201).json({
        success: true,
        url,
    });
});

exports.findlongurl = catchasyncerror(async (req, res) => {
    const { key } = req.params;
    const url = await Url.findOne({ key });
    if (!url) {
        return res.status(404).json({
            success: false,
            message: "URL not found",

        });
    }
    res.status(200).json({
        success: true,
        longUrl: url.value,
    });
});
