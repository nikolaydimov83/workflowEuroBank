const Workflow = require("../models/Workflow");

async function createWorkflow(workflowName,allowedStatuses=[]){

    let workflow=await Workflow.create({workflowName,allowedStatuses});
    return workflow
}
async function addAllowedStatus(workflowName,status){
    const workflow=await Workflow.findOne({workflowName});
    if (!workflow){
        throw new Error('Workflow with this name was not found!')
    }
    workflow.allowedStatuses.push(status);
    workflow.save();

}

async function removeAllowedStatus(status,workflowName){
   const workflowDB=await Workflow.findOne(workflowName);
   if (!workflowDB){
    throw new Error('Workflow with this name does not exist')
   }
   let index=workflowDB.allowedStatuses.indexOf(status.id);
   if (index>-1){
        workflowDB.allowedStatuses.splice(index,1);
        workflowDB.save();
   }else{
    throw new Error('Status not found!')
   }
   

}

async function getWorkflowById(workflowId){
    return await Workflow.findById(workflowId).populate('rolesAllowedToFinishRequest').populate('allowedStatuses');

}

async function checkUserRoleIsPriviliged(workflowId,user){
    let dbWorkFlow=await getWorkflowById(workflowId);
    if(dbWorkFlow.rolesAllowedToFinishRequest.findIndex((a)=>a==user.role)>-1){
        return true
    }else{
        return false
    }
}


    
 
 



module.exports={createWorkflow,addAllowedStatus,removeAllowedStatus,getWorkflowById,checkUserRoleIsPriviliged}