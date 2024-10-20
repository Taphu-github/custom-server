
function format_time(time_stamp){
    const dateObject=new Date(time_stamp);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
}

function format_date(time_stamp){
    const dateObject=new Date(time_stamp);
    const formattedDate= dateObject.toLocaleDateString();
    return formattedDate;
}

module.exports = {
    format_time,
    format_date
};
