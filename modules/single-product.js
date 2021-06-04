export const withinPeriod = ({startDate, endDate, startTime, endTime}) =>{
    let d = new Date();
    d = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + (d.getDate())).slice(-2)}`;
    
    let today = new Date(d).setUTCHours(0,0,0,0);
    let start = new Date(startDate).setUTCHours(0,0,0,0);
    let end = new Date(endDate).setUTCHours(0,0,0,0);
    
    if(today < start || today > end){
        return false;
    }
    else if(today === start && today === end){
        if(beforeTime(startTime) || afterTime(endTime)){
            return false
        }
        else return true;
    }
    else if(today === start){
        if(beforeTime(startTime)){
            return false;
        }
        else return true;
    }
    else if(today === end){
        if(afterTime(endTime)){
            return false;
        }
        else return true;
    }
    else return true
}

const beforeTime = (start) =>{
    let startHour = +start.split(":")[0];
    let startMinute = +start.split(":")[1];
    let totalStartTime = startHour * 3600000 + startMinute * 60000;

    let currentTotalTime = getCurretTotalTime();
    // console.log(currentTotalTime > totalStartTime);

    if(currentTotalTime < totalStartTime) return true;
    else return false
}

const afterTime = (end) =>{
    let endHour = +end.split(":")[0];
    let endMinute = +end.split(":")[1];
    let totalEndTime = endHour * 3600000 + endMinute * 60000;

    let currentTotalTime = getCurretTotalTime();
 
    if(currentTotalTime > totalEndTime) return true;
    else return false
}

const getCurretTotalTime = () =>{
    let today = new Date();
    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();

    let totalCurrentTime = currentHour * 3600000 + currentMinute * 60000;
    return totalCurrentTime;
}