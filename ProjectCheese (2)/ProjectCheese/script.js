"use strict"
 function changeFirst()

 {       
 	    let firstBtn = document.querySelector('.-first')
 		let secondBtn = document.querySelector('.-second')	

 		if (firstBtn.classList.contains('active')) 
 		{
 			firstBtn.classList.remove('active')
		
 		}
 		else
 		{
 			firstBtn.classList.add('active')

 		}
 		if (firstBtn.classList.add('active')) 
 			{
 				firstBtn.classList.add('active')
 			}


 		if (secondBtn.classList.remove('active')) 
 			{
 				firstBtn.classList.remove('active')
 			}

 }

 function changeSecond()

 {
 	    let firstBtn = document.querySelector('.-first')
 		let secondBtn = document.querySelector('.-second')	

		
 		if (secondBtn.classList.contains('active')) 
 		{
 			secondBtn.classList.remove('active')
		
 		}
 		else
 		{
 			secondBtn.classList.add('active')

 		}
 		if (secondBtn.classList.add('active')) 
 			{
 				secondBtn.classList.add('active')
 			}

 		if (firstBtn.classList.remove('active')) 
 			{
 				firstBtn.classList.add('active')
 			}
 			console.log('hello')
 }	 
