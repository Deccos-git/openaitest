const GroupBy = (array, property) => {
        return array.reduce((acc, obj) => {
          let key = obj[property]
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(obj)
          return acc
        }, {}) 
}

export default GroupBy