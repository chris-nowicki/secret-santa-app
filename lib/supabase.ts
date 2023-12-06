import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabase = createClient<Database>(
  'https://hkgvhmjxsxuynxrdxnun.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZ3ZobWp4c3h1eW54cmR4bnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2Mzc2NjMsImV4cCI6MjAxNzIxMzY2M30.YYV2tL78V49rBWklKa7JBRf7FyKD1lBe9HtA3fYhyKc'
)

// get all product requests from supabase db
export async function getEvents() {
  let { data } = await supabase.from('events').select(`
                id,name, date, sendReminder
                `)

  if (data) {
    return data
  }
}

// get counts of all status categories except for 'suggestions' from supabase db
// export async function getStatusCount() {
//   let count: count

//   // get status column where value does not equal 'suggestion' from the productRequest table in supabase
//   let { data } = await supabase
//     .from('productRequests')
//     .select('status')
//     .neq('status', 'suggestion')

//   // process the data to get the count of each status category
//   if (data) {
//     let planned = 0
//     let inProgress = 0
//     let live = 0

//     for (let i = 0; i < data.length; i++) {
//       if (data[i].status === 'planned') {
//         planned += 1
//       } else if (data[i].status === 'in-progress') {
//         inProgress += 1
//       } else {
//         live += 1
//       }
//     }

//     count = {
//       planned,
//       inProgress,
//       live,
//     }
//   }

//   return count
// }
