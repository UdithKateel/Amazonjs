export const deliveryoption=[{
    id: '1',
    deliveryDays:7,
    priceCents:0
},
{
    id: '2',
    deliveryDays:3,
    priceCents:15000
},
{
    id: '3',
    deliveryDays:1,
    priceCents:25000
}
]
export function GetDeliveryOption(deliveryOptionId){
   let deliveryOption;
   deliveryoption.forEach((option)=>{
    if(option.id===deliveryOptionId){
        deliveryOption=option
    }
   })
   return deliveryOption || deliveryoption[0]
}