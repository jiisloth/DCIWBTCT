let time = [3,0,0]
let start_time = (time[0] * 60 * 60 + time[1]*60 + time[2]) * 1000
let time_left = start_time
let timing = false
let lasttime = 0
let stats = {
    "bc": {"points": 15, "times": 0},
    "rune": {"points": 15, "times": 0},
    "finish": {"points": 5, "times": 0},
    "curse": {"points": 2, "times": 0},
    "blueprint": {"points": 1, "times": 0},
    "unlock": {"points": 1, "times": 0},
    "challenge": {"points": 1, "times": 0},
    "achievement": {"points": 1, "times": 0}
}

$( document ).ready(function() {
    update_bar();
    $(".container").click(function(){
        stats[this.id]["times"] += 1
        update_bar();
    });
    $(".container").contextmenu(function() {
        stats[this.id]["times"] -= 1
        if (stats[this.id]["times"] < 0){
            stats[this.id]["times"] = 0
        }
        update_bar();
        return false
    });
    $("#timer").click(function(){
        if (!timing){
            lasttime = Math.round(Date.now())
            timing = setInterval(take_time, 100)
        }
    });
    $("#timer").contextmenu(function() {
        if (timing){
            stop_timing()
        }
        return false
    });
});

function update_bar(){
    const keys = Object.keys(stats)
    let total = 0
    for (let i = 0; i < keys.length; i++){
        let times = $("#"+keys[i]).find(".times")
        let points = $("#"+keys[i]).find(".points")
        total += stats[keys[i]]["times"] * stats[keys[i]]["points"]
        if (stats[keys[i]]["times"] > 0){
            times.text(stats[keys[i]]["times"] + "x")
        }
        else {
            times.text("")
        }
        points.text(stats[keys[i]]["points"] + "p")
    }
    if (total > 0){
        $("#total").text(total + "p")
    }
    else {
        $("#total").text("")
    }
}

function take_time(){
    time_left = start_time - (Math.round(Date.now()) - lasttime)
    if (time_left < 0){
        time_left = 0
        update_clock()
        stop_timing()
    }
    update_clock()
}

function update_clock(){
    time[2] = Math.floor(time_left / 1000) % 60
    time[1] = Math.floor(time_left / 1000 / 60) % 60
    time[0] = Math.floor(time_left / 1000 / 60 / 60)
    if (time[0] > 9){
        $("#h1").text(Math.floor(time[0]/10))
    }
    else {
        $("#h1").text("")
    }
    $("#h2").text(time[0]%10)
    $("#m1").text(Math.floor(time[1]/10))
    $("#m2").text(time[1]%10)
    $("#s1").text(Math.floor(time[2]/10))
    $("#s2").text(time[2]%10)
}


function stop_timing(){
    start_time = time_left
    clearInterval(timing)
    timing = false
}