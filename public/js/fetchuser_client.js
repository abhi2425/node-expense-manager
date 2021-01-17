fetch('/fetchuser')
   .then((response) => {
      let sum = 0
      response
         .json()
         .then((result) => {
            result.forEach((element) => {
               const heading = document.querySelector('.style1')
               heading.innerHTML = 'HII!! ' + element.name

               const tbody = document.querySelector('.tbody')
               const tr = document.createElement('tr')

               const td1 = document.createElement('td')
               const name = document.createTextNode(element.name)
               td1.appendChild(name)

               const td2 = document.createElement('td')
               const itemname = document.createTextNode(element.itemname)
               td2.appendChild(itemname)

               const td3 = document.createElement('td')
               const itemprice = document.createTextNode(element.itemprice)
               td3.appendChild(itemprice)

               const td4 = document.createElement('td')
               const date = document.createTextNode(element.dateofentry)
               td4.appendChild(date)

               tr.appendChild(td1)
               tr.appendChild(td2)
               tr.appendChild(td3)
               tr.appendChild(td4)
               tbody.appendChild(tr)

               const _id = document.querySelector('._id')
               _id.innerHTML = 'User Id-:' + element._id
               const total = document.querySelector('.total')
               sum += Number(element.itemprice)
               total.innerHTML = 'Total-: $ ' + sum
            })
         })
         .catch((error) => console.log(error))
   })
   .catch((error) => {
      console.log(error)
   })
