export default function currentTime(){
    const d = new Date()
    const time = d.getHours()

    if(time > 12){
        let temp = time - 12
        if(d.getMinutes().toString().length === 1){
            let current_time = temp.toString()+':'+'0'+d.getMinutes().toString()+' PM'
            return current_time
        }
        else {
            let current_time = temp.toString()+':'+d.getMinutes().toString()+' PM'
            return current_time
        }
    }
    else if(d.getHours() == 0){
        if(d.getMinutes().toString().length == 1){
            let current_time = '12:'+'0'+d.getMinutes().toString()+' AM'
            return current_time
        }
        else {
            let current_time = '12'+':'+d.getMinutes().toString()+' AM'
            return current_time
        }
    }
    else if(d.getHours() == 12){
        if(d.getMinutes().toString().length == 1){
            let current_time = '12:'+'0'+d.getMinutes().toString()+' PM'
            return current_time
        }
        else {
            let current_time = '12'+':'+d.getMinutes().toString()+' PM'
            return current_time
        }
    }
    else{
        if(d.getMinutes().toString().length == 1){
            let current_time = d.getHours().toString()+':'+'0'+d.getMinutes().toString()+' AM'
            return current_time
        }
        else{
            let current_time = d.getHours().toString()+':'+d.getMinutes().toString()+' AM'
            return current_time
        }
    }
}

console.log(currentTime())
