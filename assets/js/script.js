$(document).ready(function () {
    var currentHour = moment().hour();

    //uncomment out line 5 and 6 to test if colors are working after hours
    // var currentHour = moment().add(15, 'hours').hour(); 
    // console.log(currentHour);

    // Displays the current date and time in the Jumbotron
    var update = function () {
        $('#currentDay').text(moment().format('dddd, MMMM Do'));
        $('#currentTime').text(moment().format('h:mm:ss a'));
    };
    update();
    setInterval(update, 1000);
    
    const hours = [
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
    ];

    for (var i = 0; i < hours.length; i++) {
        var schedulingHour = [i + 9];
        var toDoColumn = $('<tr class="hourColor">');
        var timeColumn = $(
            `<td class="align-hour"><h3 class="time" id="${hours[i]}" data-hour="${schedulingHour}">${hours[i]}</h3></td>`
        );
        var task = $(
            `<td class="align-task"><textarea class="task-form" id="${schedulingHour}text" rows="3"></textarea></td>`
        );
        var save = $(
            `<td class="align-save"><i class="far fa-save fa-2x saveBtn" data-hour="${schedulingHour}"></i></td>`
        );
        toDoColumn.append(timeColumn, task, save);
        $('tbody').append(toDoColumn);
        }

        storage();
        function storage() {
            for (var s = 9; s < 18; s++) {
                $('#' + s + 'text').val(localStorage.getItem(s));
            }
        }

        $('.saveBtn').click(function (e) {
            e.preventDefault();

            var id = $(this).data('hour');
            let task = {
                hour: $(this).data('hour'),
                message: $('#' + id + 'text').val(),
            };
            localStorage.setItem(task.hour, task.message);
        });


        var runColors = function() {
            
            var currentHour = moment().hour();
            console.log(currentHour);
            $(".align-task").each( function() {
                
                if ( schedulingHour < currentHour ) {
                    $(this).removeClass(["present", "future"]).addClass("past");
                }
                else if ( schedulingHour === currentHour ) {
                    $(this).removeClass(["past", "future"]).addClass("present");
                }
                else if ( schedulingHour > currentHour ){
                    $(this).removeClass(["past", "present"]).addClass("future");
                }
            })
        };
        runColors();


    });