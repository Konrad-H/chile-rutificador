const infoRut = require('info-rut');
const dfd = require("danfojs-node")
const ss = require("string-similarity")
const fs = require('fs')

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

async function getPersName(name) {
    person_list = await infoRut.getPersonByName(name);
    output = person_list[0]
    return output;
}

async function getBuissName(name) {
    buissness_list = await infoRut.getEnterpriseByName(name);
    output = buissness_list[0]
    return output;
}

function checkNadd_(name, pers, buiss, dict_pers, dict_buiss, dict_empty) {

    var pers_sim_name = 0;
    var buiss_sim_name = 0;
    var pers_name;
    var buiss_name;
    if (pers != undefined) {
        pers_name = pers.name.toUpperCase()
        pers_sim_name = ss.compareTwoStrings(name, pers_name)
    }
    if (buiss != undefined) {
        buiss_name = buiss.name.toUpperCase()
        buiss_sim_name = ss.compareTwoStrings(name, buiss_name)
    }

    max_sim = Math.max(pers_sim_name, buiss_sim_name)

    if (max_sim < .75) {
        dict_empty[name] = {
            'max_sim': max_sim,
            'pers_name': pers_name,
            'buiss_name': buiss_name
        }
    }

    else if (pers_sim_name >= buiss_sim_name) {
        dict_pers[name] = pers
    }
    else {
        dict_buiss[name] = buiss

    }

}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function storeDicts(dict_p, dict_b, dict_e, i) {
    console.log(Object.keys(dict_p).length)
    console.log(Object.keys(dict_b).length)
    console.log(Object.keys(dict_e).length)
    dict_all = {
        'dict_p': dict_p,
        'dict_b': dict_b,
        'dict_e': dict_e
    }
    storeData(dict_all, './assets/ruts/data_donantes_' + i + '.json')
}

async function main() {
    var name
    var dict_p = {}
    var dict_b = {}
    var dict_e = {}
    function checkNadd(n, p, b) { return checkNadd_(n, p, b, dict_p, dict_b, dict_e) }

    let df = await dfd.read_csv("assets/donantes_2019.csv") //assumes file is in CWD
    donantes = df.column('DONANTE').values
    index = df.column('').values

    shuffleArray(index)
    for (i in index) {
        if (i % 100 == 0) {
            storeDicts(dict_p, dict_b, dict_e, i)
        }
        name = donantes[index[i]];
        console.log(name)
        // name = 'Konrad'

        pers = await getPersName(name)
        buiss = await getBuissName(name)
        checkNadd(name, pers, buiss)

    }



}

main()