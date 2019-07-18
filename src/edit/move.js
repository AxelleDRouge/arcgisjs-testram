import newSelect from './newselect';
import selectExistingFeature  from './selectexist';
import edition from './applyedit'

const moveFeature = (view, flsclient, flssource, ws)=> {
    return new Promise(function (resolve, reject) {
                            
       const exists = selectExistingFeature(view, flsclient);
       exists.then((obj)=>{
        newSelect(obj)
        .then((obj)=>{
            console.log(obj)
            //resolve(obj)
            edition(obj, flssource, flsclient, ws)
        })
       })
    })
}

module.exports = moveFeature;