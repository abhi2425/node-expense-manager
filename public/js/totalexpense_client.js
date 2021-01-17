const totalExpenseHandler = async () => {
   try {
      const response = await fetch('/totalexpense')
      const result = await response.json()
      let count = 0
      const expense = []
      console.log(result)
      result.forEach((element) => {
         count++
         expense.push(element.sum)
         expense.sort((a, b) => {
            if (a > b) return 1
            if (a == b) return 0
            if (a < b) return -1
         })

         const totalSum = expense.reduce((total, item) => item + total)
         const avgSum = totalSum / count

         const tbody = document.querySelector('.tbody')
         const tr = document.createElement('tr')

         const td1 = document.createElement('td')
         const userid = document.createTextNode(element._id)
         td1.appendChild(userid)

         const td2 = document.createElement('td')
         const name = document.createTextNode(element.name)
         td2.appendChild(name)

         const td3 = document.createElement('td')
         const sum = document.createTextNode(element.sum)
         td3.appendChild(sum)

         tr.appendChild(td1)
         tr.appendChild(td2)
         tr.appendChild(td3)
         tbody.appendChild(tr)
         const total_users = document.querySelector('.total_users')
         total_users.innerHTML = 'Total Users-:' + count

         const max_expense = document.querySelector('.max_expense')
         max_expense.innerHTML = 'Max Expense-: ' + '$ ' + expense[expense.length - 1].toFixed(2)

         const min_expense = document.querySelector('.min_expense')
         min_expense.innerHTML = 'Min Expense-: ' + '$ ' + expense[0].toFixed(2)

         const avg_expense = document.querySelector('.avg_expense')
         avg_expense.innerHTML = 'Average Expense-: ' + '$ ' + avgSum.toFixed(2)
      })
   } catch (error) {
      console.log(error.message)
   }
}
totalExpenseHandler()
