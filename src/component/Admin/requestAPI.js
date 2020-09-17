export default function getAllUsers(){
    fetch('http://localhost:3002/users',{
      mode:'cors'
    })
    .then((response) => { 
        return response.json()})
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}