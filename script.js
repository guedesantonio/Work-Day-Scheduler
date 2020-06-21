//array to hold the hour titles of each timeblock
var hours=["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
//sets the day of the week at the top of the page
$("#currentDay").text(moment().format('dddd MMMM Do'));

//update color of the timeblocks based on time of day
var colorUpdater = function(time){
    var hour = parseInt((time.split(":"))[0]) + 3;
    for(var i = 0; i<hours.length;i++){
        var currentTask =  $("#task-"+i).parent();
       if(i < hour){
        currentTask.removeClass("present")
        currentTask.removeClass("future")
        currentTask.addClass("past")
       }
       else if(i== hour){
        currentTask.removeClass("past")
        currentTask.removeClass("future")
        currentTask.addClass("present")
       } 
       else if(i> hour){
        currentTask.removeClass("past")
        currentTask.removeClass("present")
        currentTask.addClass("future")
       } 
    }
};

//time managing function
setInterval(function(){
    //Local Time
    var time = moment().format('LT');
    $("#currentTime").text(time);
    colorUpdater(time);
}, 1000);

//initialize time block function
var createTimeBlocks = function(){

    //loop through work hours
    for(i=0; i<hours.length;i++){
        
        //create hour
        var hour = $("<div>")
            .addClass("col-1 hour")
            .text(hours[i]);

        //create task
        var task = $("<p>")
            .addClass("description")
            .attr("id", "task-" + i);    

        var taskBox = $("<div>")
            .addClass('col-10 textarea past')           
            .append(task);

        //create save button
        var buttonLogo = $("<span>")
            .addClass("oi oi-box")

        var button = $("<button>")
            .addClass("saveBtn")
            .append(buttonLogo);

        var saveButton = $("<div>")
            .addClass("col-1")
            .attr("id", "save-" + i)
            .append(button);

        //append hour, task, button to row
        var row = $("<div>")
            .addClass("row")
            .append(hour, taskBox, saveButton)
        
            //append row to container
        $("#timeBlockHolder").append(row);

        //if localStorage exists, populate task
        var loadTasks = function(id){
            var task = JSON.parse(localStorage.getItem("save-"+id));

            if (task != null){
                $("#task-"+i).text(task);
            }
        }

        //check localStorage for data
        loadTasks(i);
       
    }
    //Changes the native p to a textarea
    $(".textarea").on("click", "p", function(){
        console.log("text area clicked");
        var text = $(this)
            .text()
            .trim();
    
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);
        
        $(this).replaceWith(textInput);
    
        textInput.trigger("focus");

        //changes the textarea back to a p when done editing
        $(".textarea").on("blur", "textarea", function(){
            var text = $(this)
                .val()
                .trim();
    
            var taskP = $("<p>")
            .addClass("description")
            .text(text);
    
            $(this).replaceWith(taskP);
        });
    })

    //saves the content of each timeblock
    $(".saveBtn").on("click", function(){

        var text = $(this).parent().siblings(".textarea").text();
        var time = $(this).parent().attr("id");

        localStorage.setItem(time, JSON.stringify(text));
    });
}



createTimeBlocks();
