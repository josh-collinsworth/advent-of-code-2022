//I had to change this to plain JS to get it to run but it works. ¯\_(ツ)_/¯

const test_input = 
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const input = test_input.split('\n')

const generateFolders = (inputs) => {
  let directories = { '/': { data: 0, contains: [] } }
  let currentPath = []

  inputs.forEach((line, i) => {
    if (line.startsWith('$ cd')) {
      const newPath = line.substring(5)
      if (newPath == '..') {
        currentPath = currentPath.slice(0, currentPath.length - 1)
      } else {
        currentPath.push(newPath)
      }
    } else if (line == '$ ls') {
      let listedDirectory = false
      let searchedIndex = i + 1
      while (!listedDirectory) {
        const thisLine = inputs[searchedIndex]
        if (!thisLine || thisLine.startsWith('$')) {
          listedDirectory = true
          break
        }

        if (thisLine.startsWith('dir')) {
          const dirName = currentPath.join('') + thisLine.split(' ')[1]
          directories[currentPath.join('')].contains.push(dirName)
          if (!directories.hasOwnProperty(dirName)) {
            directories[dirName] = { contains: [], data: 0 }
          } 
        } else if (parseInt(thisLine)) {
          directories[currentPath.join('')].data += parseInt(thisLine)
        }
        searchedIndex++
      }
    }
  })
  return directories
}

const sumAllFoldersUnder100k = (folders) => {
  let n = 0
  Object.keys(folders).forEach((key) => {
    if (folders[key].data <= 100000) {
      let folderSize = folders[key].data
      
      const recursivelyGrabFolderData = (folder) => {
        folderSize += folders[folder].data
        if (folders[folder].contains.length) {
          folders[folder].contains.forEach(subfolder => recursivelyGrabFolderData(subfolder))
        }
      }
      
      folders[key].contains.forEach(subfolder => {
        recursivelyGrabFolderData(subfolder)
      })

      if (folderSize <= 100000) {
        n += folderSize
      }
    }
  })
  return n
}

const folders = generateFolders(input)


// sumAllFoldersUnder100k(generateFolders(input))

// ---- Part Two ----- //

const findTotalOfAllDirectories = (input) => {
  let sizes = []

  const recursivelyGrabFolderData = (folder) => {
    let size = 0
    size += folders[folder].data
        
    folders[folder].contains.forEach(subfolder => {
      size += recursivelyGrabFolderData(subfolder)
    })
    return size
  }
  
  Object.keys(input).forEach(key => {   
    const folderSize = recursivelyGrabFolderData(key)
    sizes.push({ key, size: folderSize })
  })
    
  return sizes.filter(f => f.size >= 3441553).sort((a, b) => a.size - b.size)
}

findTotalOfAllDirectories(folders)

// 70000000 - 43441553 = 26558447

// 03441553