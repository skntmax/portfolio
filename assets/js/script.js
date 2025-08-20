
function getValue(event) {    
    let ele = document.getElementById(event.id)
      formdata= {
         ...formdata ,[event.id]:ele.value
      }

}