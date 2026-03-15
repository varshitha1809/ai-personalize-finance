import { useEffect, useState } from "react"
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Plus, Trash2 } from "lucide-react"

import {
LineChart,
Line,
PieChart,
Pie,
Cell,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer
} from "recharts"

type Expense={
id:number
title:string
category:string
amount:number
}

export function DashboardPage(){

const [expenses,setExpenses]=useState<Expense[]>([])
const [title,setTitle]=useState("")
const [category,setCategory]=useState("")
const [amount,setAmount]=useState<number>(0)
const [showModal,setShowModal]=useState(false)
const [filter,setFilter]=useState("all")

useEffect(()=>{
loadExpenses()
},[])

function getToken(){
return localStorage.getItem("token")
}

async function loadExpenses(){
const token=getToken()
fetch("http://127.0.0.1:8000/expenses",{
headers:{Authorization:`Bearer ${token}`}
})
.then(res=>res.json())
.then(data=>{
console.log("API DATA:",data)
if(Array.isArray(data)){
setExpenses(data)
}else{
setExpenses([])
}
})
.catch(err=>console.error(err))
}

async function addExpense(){
const token=getToken()
await fetch("http://127.0.0.1:8000/expenses",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({title,category,amount})
})

setTitle("")
setCategory("")
setAmount(0)
setShowModal(false)
loadExpenses()
}

async function deleteExpense(id:number){
const token=getToken()
await fetch(`http://127.0.0.1:8000/expenses/${id}`,{
method:"DELETE",
headers:{Authorization:`Bearer ${token}`}
})
loadExpenses()
}

const categories=["all",...new Set((expenses??[]).map(e=>e.category))]

const filteredExpenses=
filter==="all"
?(expenses??[])
:(expenses??[]).filter(e=>e.category===filter)

/* -------- ANALYTICS -------- */

const totalSpending=
filteredExpenses.reduce((sum,e)=>sum+e.amount,0)

const savingsPotential=Math.round(totalSpending*0.2)

const monthlyBudget=50000

const remainingBudget=monthlyBudget-totalSpending

const predictedNextMonth=Math.round(totalSpending*1.08)

const healthScore=
totalSpending<20000?9:
totalSpending<40000?7:
totalSpending<60000?5:3

/* -------- CATEGORY DATA -------- */

const categoryTotals:Record<string,number>={}

filteredExpenses.forEach(e=>{
if(!categoryTotals[e.category]){
categoryTotals[e.category]=0
}
categoryTotals[e.category]+=e.amount
})

const categoryData=
Object.keys(categoryTotals).map(key=>({
name:key,
value:categoryTotals[key]
}))

/* -------- MONTHLY TREND -------- */

const monthlyData=[
{month:"Jan",spending:totalSpending*0.7},
{month:"Feb",spending:totalSpending*0.8},
{month:"Mar",spending:totalSpending*0.9},
{month:"Apr",spending:totalSpending*1.05},
{month:"May",spending:totalSpending*0.95},
{month:"Jun",spending:totalSpending}
]

const colors=[
"#6366F1",
"#10B981",
"#F59E0B",
"#EC4899",
"#A855F7"
]

/* -------- AI INSIGHTS -------- */

const insights:string[]=[]

if(totalSpending>50000){
insights.push("⚠️ Your spending is high this month.")
}

if(categoryTotals["Food"] && categoryTotals["Food"]>totalSpending*0.35){
insights.push("🍔 Food expenses exceed 35% of spending.")
}

if(insights.length===0){
insights.push("✅ Your spending pattern looks healthy.")
}

return(

<div className="space-y-8">

{/* HEADER */}

<div className="flex justify-between items-center">

<div>

<h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
Financial Dashboard
</h1>

<p className="text-slate-600 dark:text-slate-400">
Real-time financial analytics
</p>

</div>

<div className="flex gap-3">

<select
  value={filter}
  onChange={(e)=>setFilter(e.target.value)}
  className="border border-white/20 bg-slate-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
  {categories.map((c)=>(
    <option
      key={c}
      value={c}
      className="bg-slate-900 text-white"
    >
      {c}
    </option>
  ))}
</select>

<button
onClick={()=>setShowModal(true)}
className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
>

<Plus size={18}/>
Add Expense

</button>

</div>

</div>

{/* SUMMARY */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

<div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 backdrop-blur-xl">

<Wallet/>

<p className="text-slate-600 dark:text-slate-400">
Total Spending
</p>

<h2 className="text-2xl font-bold text-white">
₹{totalSpending}
</h2>

</div>

<div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 backdrop-blur-xl">

<TrendingDown/>

<p className="text-slate-600 dark:text-slate-400">
Remaining Budget
</p>

<h2 className="text-2xl font-bold text-white">
₹{remainingBudget}
</h2>

</div>

<div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 backdrop-blur-xl">

<PiggyBank/>

<p className="text-slate-600 dark:text-slate-400">
Savings Potential
</p>

<h2 className="text-2xl font-bold text-white">
₹{savingsPotential}
</h2>

</div>

<div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 backdrop-blur-xl">

<TrendingUp/>

<p className="text-slate-600 dark:text-slate-400">
Financial Health
</p>

<h2 className="text-2xl font-bold text-white">
{healthScore}/10
</h2>

</div>

</div>

{/* CHARTS */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

<div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 backdrop-blur-xl">

<h3 className="font-semibold text-white mb-4">
Monthly Spending Trend
</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={monthlyData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip
contentStyle={{
backgroundColor:"rgba(30,30,46,0.9)",
border:"1px solid rgba(255,255,255,0.1)",
borderRadius:"8px",
color:"#fff"
}}
/>

<Line type="monotone" dataKey="spending" stroke="#6366F1"/>

</LineChart>

</ResponsiveContainer>

</div>

<div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 backdrop-blur-xl">

<h3 className="font-semibold text-white mb-4">
Spending by Category
</h3>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={categoryData}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>

{categoryData.map((entry,index)=>(
<Cell key={index} fill={colors[index%colors.length]}/>
))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

{/* AI SECTION */}

<div className="grid md:grid-cols-2 gap-6">

<div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">

<h3 className="font-semibold text-white mb-3">
AI Insights
</h3>

{insights.map((i,index)=>(
<p key={index} className="text-slate-300">
• {i}
</p>
))}

</div>

<div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20">

<h3 className="font-semibold text-white mb-3">
AI Prediction
</h3>

<p className="text-slate-300">
Next month spending may reach
<strong> ₹{predictedNextMonth}</strong>
</p>

</div>

</div>

{/* EXPENSE LIST */}

<div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 backdrop-blur-xl">

<h3 className="font-semibold text-white mb-4">
Recent Expenses
</h3>

{filteredExpenses.length===0?(
<p className="text-slate-400">
No expenses yet
</p>
):(

filteredExpenses.map(e=>(

<div
key={e.id}
className="flex justify-between border-b border-white/10 py-2 text-white"
>

<span>{e.title}</span>
<span>{e.category}</span>
<span>₹{e.amount}</span>

<button
onClick={()=>deleteExpense(e.id)}
className="text-red-400"
>

<Trash2 size={16}/>

</button>

</div>

))

)}

</div>

{/* ADD EXPENSE MODAL */}

{showModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-slate-900 p-6 rounded-xl space-y-4 w-80">

<h3 className="text-lg text-white font-semibold">
Add Expense
</h3>

<input
className="border p-2 w-full bg-transparent text-white"
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
className="border p-2 w-full bg-transparent text-white"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<input
type="number"
className="border p-2 w-full bg-transparent text-white"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(Number(e.target.value))}
/>

<div className="flex gap-2">

<button
onClick={addExpense}
className="bg-indigo-600 text-white px-4 py-2 rounded"
>
Save
</button>

<button
onClick={()=>setShowModal(false)}
className="px-4 py-2 text-white"
>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

)
}