

export const infoObj={
    task:[{
    label:"Task Name",
    name:"taskName",
    type:"input",
    required:true
},{
    
        label:"Assignee ",
        name:"assignee",
        type:"input",
        required:true
    
},
{
    
    label:"Due date ",
    name:"dueDate",
    type:"date",
    required:true

},
{
    
    label:"Status",
    name:"status",
    type:"select",
    option:[{label:"New",value:"New"},{label:"In progress",value:"In Progress"},{label:"Completed",value:"Completed"}],
    required:true

}

],
condition:[{
    label:"Condition",
    name:"condition",
    type:"input",
    required:true
},{
    
    label:"Status",
    name:"status",
    type:"select",
    option:[{label:"Satisfied",value:"Satisfied"},{label:"Failed",value:"Failed"}],
    required:true

}

],
notification:[{
label:"Message",
name:"message",
type:"input",
required:true
},  {
label:"Status",
name:"status",
type:"select",
option:[{label:"Sent",value:"Sent"},{label:"Failed",value:"Failed"}],
required:true

}]
}