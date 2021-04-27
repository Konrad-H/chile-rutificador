const infoRut = require('info-rut');

async function getName(name){
    person_list = await infoRut.getPersonByName(name);
    
    // if (name==person_list[0]['name']){
    //     console.log(console.log(person_list[0]));
    // }
    return person_list[0];
}

async function printName(name){
    
    console.log( await getName(name));
}

// const rut= '11111111-1'
const name = 'Konrad Hartmann Vaccarezza';
console.log(name);

// await infoRut.getPersonByRut(rut)
// await infoRut.getEnterpriseByRut(rut)
// await infoRut.getEnterpriseByName(name)

printName(name)