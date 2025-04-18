import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        docId: { type: String, required: true },
        slotDate: { type: String, required: true },
        slotTime: { type: String, required: true },
        userData: { type: Object, required: true },
        doctorData: { type: Object, required: true },
        amount: { type: Number, required: true },
        date: { type: Number, required: true },
        cancelled: { type: Boolean, default: false },//if the user cancelled the appointment then it will make as true
        isAccepted: { type: Boolean, default: false },
        payment: { type: Boolean, default: false },// if the user paid online then it will be true if not paid it will be false
        isCompleted: { type: Boolean, default: false }//when appointment completed then doctor can make it true
    }
)
const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default appointmentModel