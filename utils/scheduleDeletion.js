const MimeNode = require("nodemailer/lib/mime-node");
const { OTP } = require("../app/models");

const scheduleOtpDeletion = (otpId, delay) => {
    setTimeout(async () => {
        try {
            // Hapus OTP dari database berdasarkan ID
            await OTP.destroy({ where: { id: otpId } });
            console.log(`OTP with ID ${otpId} has been deleted.`);
        } catch (error) {
            console.error('Error deleting OTP:', error);
        }
    }, delay);
};

module.exports = scheduleOtpDeletion;