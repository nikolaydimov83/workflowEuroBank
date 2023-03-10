const { Schema, model,Types } = require("mongoose");


const workflowSchema=new Schema({
    workflowName:{type:String, require:true, unique:true},
    allowedStatuses:{type:[Types.ObjectId],ref:'Status'},
    workflowCreateDate:{type:Date,default:Date.now,immutable:true},
    rolesAllowedToFinishRequest:{type:[String]}
});

workflowSchema.index({workflowName:1},{
    collation:{
        locale:'en',
        strength:2
    }
});


const Workflow=model('Workflow', workflowSchema);

module.exports=Workflow;