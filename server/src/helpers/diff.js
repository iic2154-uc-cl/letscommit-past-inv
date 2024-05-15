var parse = require('parse-diff');


const file_chunks_to_string = (file_chunks) => {
    let file_string = '';

    for (const chunk of file_chunks) {
        file_string += chunk.content + '\n';
        for (const change of chunk.changes) {
            file_string += change.content + '\n';
        }
    }
                
    return file_string;
}

const parse_code_diff = (diff) => {
    // return format:
    // [{fileName, filediff}, {fileName, filediff}, ...]
    const parsed = parse(diff);
    const files = [];
    for (const file of parsed) {
        const fileName = 'a/'+file.from + ' -> b/'+file.to;
        const fileDiff = file_chunks_to_string(file.chunks);
        files.push({ fileName, fileDiff });
    }
    return files;
}

const chunkPriorities = (diff) => {
    return NaN;
}

module.exports = {
    file_chunks_to_string,
    parse_code_diff,
    chunkPriorities,
}