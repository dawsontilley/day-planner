//get date and load it at the top of the page


var dateToday = new Date();
var d = String(dateToday.getDate());
var m= String(dateToday.getMonth())
var y=String(dateToday.getFullYear());
var today=d+"/"+m+"/"+y;
var currentHour=String(dateToday.getHours());
console.log(currentHour);
var todayEl=$("#currentDay").text(today);



var savedTasks =[];


// creates a task element based off the clicked input.
var createTask = function(taskText, timeID) {
    // create elements that make up a task item
    var toDeleteS =$(timeID).find("form");
    console.log(toDeleteS);
    var toAdd = $(timeID);
 
    var taskH4 = $("<p></p>").text(taskText);
   
    var myTask = document.createElement("p");
    myTask.innerHTML = taskText;  
 
    toAdd.append(taskH4);

    task={
        text:taskText,
        id:timeID,
        
    };
   
  colorTask(timeID);
  savedTasks.push(task);

  toDeleteS.remove();
  saveTasks();
  
  };
// save the tasks
  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  };

//load the tasks at the start 
  var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
   
    if (!tasks) {
       //console.log("no tasks");
       return;
       
      };
    
    
    for (var i=0;i<tasks.length;i++){
        console.log(tasks[i]);
        if (!tasks[i].text){
            break;
        }
        else {
            
            createTask(tasks[i].text,tasks[i].id);
        }
    }
  };
  //the below code listens for the button to click before saving a task
$(".card").on("click","button",function() {
    event.preventDefault;


var formId="#form-"+this.id;
var createId="#card-"+this.id;

//console.log(formId);
var feedVal= $(formId)[0].value;
createTask(feedVal,createId);

});

// this will change the color of the task depending on when it is due
var colorTask = function(taskEl) {
    // get date from task element
    var hour = $(taskEl)
      //.find("card")
      .attr("data-time");
      //console.log(hour);
    console.log(hour);
    // convert to moment object at 5:00pm
    //var time = moment(date, "L").set("hour", 17);
  
    // remove any old classes from element
    $(taskEl).removeClass("list-group-item-warning list-group-item-danger");
    console.log("in else if "+Math.abs(moment().diff(hour,"hours")));

    var hourInt=parseInt(hour);
    var currInt=parseInt(currentHour);
    var diff=hourInt-currInt;
    console.log(diff);
    // apply new class if task is near/over due date
    if (hourInt<currentHour) {
      $(taskEl).addClass("list-group-item-danger");
    } else if (diff <= 2 && diff>0) {
      $(taskEl).addClass("list-group-item-warning");
    }
    else{
        $(taskEl).addClass("list-group-item-info");  
    }
  };

  
  //load previous tasks
  loadTasks();
  // color tasks once at the start
  $(".card").each(function() {
    colorTask($(this));
  });
  