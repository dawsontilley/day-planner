//get date 
var dateToday = new Date();
//console.log(dateToday.toLocaleDateString);
var d = String(dateToday.getDate());
var m= String(dateToday.getMonth())
var y=String(dateToday.getFullYear());
var today=d+"/"+m+"/"+y;
var hour=String(dateToday.getHours());
//console.log(today);
var todayEl=$("#currentDay").text(today);

console.log(todayEl);

var savedTasks =[];
// recieve input
var createTask = function(taskText, timeID,taskR) {
    // create elements that make up a task item
    var toAdd = $(timeID);
    console.log(toAdd);
    var taskH4 = $("<p></p>").text(taskText);
    var txt2 = $("<p></p>").text("Text.").addClass("card");
    var myTask = document.createElement("p");
    myTask.innerHTML = taskText;  
   
   
    // append span and p element to parent li
    toAdd.append(taskH4);

    task={
        text:taskText,
        id:timeID,
        remove:taskR,
    }
   
    console.log("remove"+task.remove);

  savedTasks.push(task);
  //taskR.remove();
  saveTasks();
    // append to ul list on the page
    //$("#list-" + taskList).append(taskLi);
  };

  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  };

  var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
       console.log("no tasks");
       return;
       
      };
    
    
  
    // loop over object properties
    $.each(tasks, function(list, arr) {
      // then loop over sub-array
        console.log(tasks.text);
        createTask(tasks.text, tasks.id,tasks.remove);
      
    });
  };
  
$(".card").on("click","button",function() {
var toRemove=this.parentElement;
var removeID=this.parentElement.id;
console.log("remove idcheck "+removeID);
var formId="#form-"+this.id;
createId="#card-"+this.id;

console.log(formId);
var feedVal= $(formId)[0].value;
createTask(feedVal,createId,toRemove);
event.preventDefault;
console.log(toRemove);

//createTask()
//console.log(parent);
//var parentEl=$('#'+parent);
//toRemove.remove();
//console.log(parentEl.parentElement);
});

var auditTask = function(taskEl) {
    // get date from task element
    var date = $(taskEl)
      .find("card")
      .id();
      console.log(date);
  
    // convert to moment object at 5:00pm
    //var time = moment(date, "L").set("hour", 17);
  
    // remove any old classes from element
    $(taskEl).removeClass("list-group-item-warning list-group-item-danger");
  
    // apply new class if task is near/over due date
    if (moment().isAfter(hour)) {
      $(taskEl).addClass("list-group-item-danger");
    } else if (Math.abs(moment().diff(hour, "hours")) <= 2) {
      $(taskEl).addClass("list-group-item-warning");
    }
  };
  loadTasks();