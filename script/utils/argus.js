const [path,file,...argus] = process.argv

exports.argus = () => {
    return argus
}

exports.file = ()=>{
    return file
}

exports.path = ()=>{
    return path
}

