console.log('client side javascript file');

 
 const weatherform=document.querySelector('form');
 const inputvalue=document.querySelector('input');
 const messageone=document.querySelector('#message1');
 const messagetwo=document.querySelector('#message2');

 messageone.textContent='Loading...'
messagetwo.textContent=''

 weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=inputvalue.value;
    console.log(location)

    
fetch('http://localhost:3000/weather?address='+location).
        then((response)=> {response.json().
        then((data)=>{
            if(data.error)
            {
               messageone.textContent=data.error
               messagetwo.textContent=''
            }
            else{
                // console.log(data.forecastdata)
                // console.log(data.place)
                messageone.textContent=data.place;
                messagetwo.textContent=data.forecastdata
            }
            
     
  })
 })

 })