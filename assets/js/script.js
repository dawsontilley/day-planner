//get date 
var dateToday = new Date();
//console.log(dateToday.toLocaleDateString);
var d = String(dateToday.getDate());
var m= String(dateToday.getMonth())
var y=String(dateToday.getFullYear());
var today=d+"/"+m+"/"+y;
//var hour=String(dateToday.getHours());
//console.log(hour);
var todayEl=$("#currentDay").text(today);

//console.log(todayEl);

var savedTasks =[];
// recieve input
var createTask = function(taskText, timeID) {
    // create elements that make up a task item
    var toDeleteS =$(timeID).find("form");
    console.log(toDeleteS);
    var toAdd = $(timeID);
    //console.log(toAdd);
    var taskH4 = $("<p></p>").text(taskText);
    //var txt2 = $("<p></p>").text("Text.").addClass("card");
    var myTask = document.createElement("p");
    myTask.innerHTML = taskText;  
   
   
    // append span and p element to parent li
    toAdd.append(taskH4);

    task={
        text:taskText,
        id:timeID,
        
    };
   
  colorTask(timeID);
  savedTasks.push(task);
  //console.log(savedTasks);
  //taskR.remove();
  toDeleteS.remove();
  saveTasks();
  //$(toDeleteS).remove();
    // append to ul list on the page
    //$("#list-" + taskList).append(taskLi);
  };

  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  };

  var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    //console.log("in load");
    //console.log(tasks);
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
       //console.log("no tasks");
       return;
       
      };
    
    //for (let i=0)
    for (var i=0;i<tasks.length;i++){
        console.log(tasks[i]);
        if (!tasks[i].text){
            break;
        }
        else {
            
            createTask(tasks[i].text,tasks[i].id);
        }
    }
    // loop over object properties
    /*$.each(tasks, function(list, arr) {
        if(tasks)
      // then loop over sub-array
        console.log(tasks.text);
        createTask(tasks.text, tasks.id,tasks.remove);
      
    });*/
  };
  
$(".card").on("click","button",function() {
    event.preventDefault;


var formId="#form-"+this.id;
var createId="#card-"+this.id;

//console.log(formId);
var feedVal= $(formId)[0].value;
createTask(feedVal,createId);



//createTask()
//console.log(parent);
//var parentEl=$('#'+parent);
//toRemove.remove();
//console.log(parentEl.parentElement);
});

var colorTask = function(taskEl) {
    // get date from task element
    var hour = $(taskEl)
      //.find("card")
      .attr("data-time");
      //console.log(hour);
  
    // convert to moment object at 5:00pm
    //var time = moment(date, "L").set("hour", 17);
  
    // remove any old classes from element
    $(taskEl).removeClass("list-group-item-warning list-group-item-danger");
    console.log("in else if "+Math.abs(moment().diff(hour,"hours")));
    // apply new class if task is near/over due date
    if (moment().isAfter(hour)) {
      $(taskEl).addClass("list-group-item-danger");
    } else if (Math.abs(moment().diff(hour, "hours")) <= 2) {
        
      $(taskEl).addClass("list-group-item-warning");
    }
  };

  setInterval(function() {
    $(".card .list-group-item").each(function() {
      colorTask($(this));
    });
  }, 1800000);
  
  loadTasks();
  // color tasks once at the start
  /*
  $(".card").each(function() {
    auditTask($(this));
  });
  */