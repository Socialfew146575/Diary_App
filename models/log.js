
    import {Schema,model,models} from "mongoose"


    const logSchema=new Schema({

        creator:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        log:{
            type:String,
            required:[true,"Log is required"]
        },
        date:{
            type:Date,
            required:[true,"Date is required"]
        },
        visible:{
            type:Boolean,
            required:[true]
        }




    })

const Log=models.Log || model("Log",logSchema)
export default Log;