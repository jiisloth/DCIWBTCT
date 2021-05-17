let time = [3,0,0,9]
let timing = false

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
        clearInterval(timing)
        timing = setInterval(take_time, 100)
    });
    $("#timer").contextmenu(function() {
        stop_timing()
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
    time[3] -= 1
    if (time[3] < 0){
        time[3] = 9
        time[2] -= 1
    }
    if (time[2] < 0){
        time[2] = 59
        time[1] -= 1
    }
    if (time[1] < 0){
        time[1] = 59
        time[0] -= 1
    }
    if (time[0] < 0){
        time = [0,0,0,0]
        update_clock()
        stop_timing()
    }
    update_clock()

}

function update_clock(){
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
    clearInterval(timing)
}