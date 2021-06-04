export const validator = (sd,ed,st,et, demo) =>{
    let now = new Date();
    let sdS = sd.split("-");
    let edS = ed.split("-");

    let stS = st.split(":");
    let etS = et.split(":");

    let totalStart = Date.UTC(sdS[0],sdS[1]-1,sdS[2],stS[0],stS[1]);
    let totalEnd = Date.UTC(edS[0],edS[1]-1,edS[2],etS[0],etS[1]);
    let totalNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

    let inPast = totalNow > totalStart;
    let hourDifference = (totalEnd - totalStart)/36e5;
    let lessThan2Hours = demo ? false : hourDifference < 2 ? true : false;
    // If hour difference is negative then definitly the start date is later than end date since we are dealing with overall caluclated time, 
    // same as totalend - totalstart but in hours rather than milliseconds
    let startIsLater = hourDifference < 0 ? true : false;

    if(inPast){
        return "Dates cannot start in the past";
    } 
    else if(lessThan2Hours && !startIsLater){
        return "Bidding period should be at least 2 hours or more"
    }
    else if(startIsLater){
        return "Start date and time cannot be later than end date and time"
    }
    else false;
}


export const getTotalTime = (date, time) =>{
    let d = date.split("-");
    let t = time.split(":");

    let totalTime = Date.UTC(d[0],d[1]-1,d[2],t[0],t[1]);

    return totalTime;
}