$('#date').bootstrapMaterialDatePicker({ time: false,
    minDate : new Date(),
    maxDate: moment().add(7, 'd') })
    .on('change',(e,date)=>{
        
        let selectedDate=new Date(date).getDate();
        let selectedTime=new Date(date).getHours();
        
     
        let slots;
        $.ajax({ url: 'https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec',
         method: 'GET',
         beforeSend: function() {
            $("#loader").modal('show');
        },
        success: function(data) {
            $("#loader").modal('hide');
        } })
        .then(function (data) {
        
        data.forEach((item)=>{
           if(item.course_name===document.getElementById('courseName').value){
               slots=item.slots
              
           }
        });
        $('#rad-group').empty();
        $('.noslot').empty();
        slots.forEach((i)=>{
        if(new Date(parseInt(i.slot)).getDate()===selectedDate)
        
        { 
            // 
            var label = document.createElement("LABEL");
            label.classList.add('btn');
            label.classList.add('btn-default');
            label.classList.add('cust');
           
            var input_rad = document.createElement("INPUT");
            input_rad.classList.add('radio-hidden');
            input_rad.classList.add('form-check-input');
            input_rad.type="radio";
            input_rad.name="slot";
            
            
            input_rad.value=i.slot;
            const timeslot=moment.unix(i.slot/1000).format("HH:mm");
            label.innerHTML=`${timeslot}`
            document.getElementById("rad-group").appendChild(label); 
            label.appendChild(input_rad); 
        }
         
        

        })
        let today = new Date()
        if (selectedDate === today.getDate()) {
            var hours = moment();
            const radGroup = document.querySelectorAll('.cust');
            radGroup.forEach((i)=>{
                let labelHour=moment(i.innerText,'HH:mm')
              let duration =moment.duration(labelHour.diff(hours))
             
             if (duration.asMinutes()<240) {
                 i.remove();
             }

            })
           
        }
    if(document.querySelectorAll('.cust').length===0)
        {
               var noSlotAvailable = document.createElement("p");
               noSlotAvailable.innerText="No slots Available.";
               document.querySelector('.noslot').appendChild(noSlotAvailable);
        }

        })

        .catch(function (err) {
        console.log(err);
        });

       
        return false;
    })

 $('#submit').click((e)=>{
     $('#form').reset();
 })
    
 