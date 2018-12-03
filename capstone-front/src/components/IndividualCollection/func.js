
module.exports = {


 sortItem: (selectedValue, collectionItems ) => {

    if(selectedValue === 'name'){
      collectionItems.sort((a, b)=>{
        if(a.props.collection.name < b.props.collection.name){return -1}
        if(a.props.collection.name > b.props.collection.name){return 1}
      })
    }else if(selectedValue === 'value'){
      collectionItems.sort((a, b)=>{
        if(a.props.collection.value === ""){return 1}
        if(b.props.collection.value === ""){return -1}
        if(a === b){return 0}
        return a.props.collection.value < b.props.collection.value ? -1: 1
      })
    }else if(selectedValue === 'customInput1'){
      collectionItems.sort((a, b)=>{
        if(a.props.collection.customInput1 === ""){return 1}
        if(b.props.collection.customInput1 === ""){return -1}
        if(a === b){return 0}
        return a.props.collection.customInput1 < b.props.collection.customInput1 ? -1: 1
      })
    }else if(selectedValue === 'customInput2'){
      collectionItems.sort((a, b)=>{
        if(a.props.collection.customInput2 === ""){return 1}
        if(b.props.collection.customInput2 === ""){return -1}
        if(a === b){return 0}
        return a.props.collection.customInput2 < b.props.collection.customInput2 ? -1: 1
      })
    }else if(selectedValue === 'customInput3'){
      collectionItems.sort((a, b)=>{
        if(a.props.collection.customInput3 === ""){return 1}
        if(b.props.collection.customInput3 === ""){return -1}
        if(a === b){return 0}
        return a.props.collection.customInput3 < b.props.collection.customInput3 ? -1: 1
      })
    }
}

}