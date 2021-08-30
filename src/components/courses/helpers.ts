/**
 * Components - Charts - Course - Helper
 */

 export const chartData = (data) => {
   const result = { data:[], status:{}}
   let inProgress = 0;
   let todo = 0;
   let done = 0;
   let total = data.length;

   data.forEach(item => {
     if(item.status === 'inprogress')
      inProgress++;
     else if(item.status === 'done')
      done++;
     else
      todo++;
   });

   result.data = [
      {id: 1, label: 'inprogress', value: inProgress},
      {id: 2, label: 'todo', value: todo}
    ];

   result.status = {inProgress, todo, done, total}

   return result
 }
