"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react'

const sampleData = {
  "Dates": ["2024-10-29", "2024-10-31", "2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04"],
  "Bear": [0, 2, 0, 0, 0, 1],
  "Boar": [0, 0, 0, 0, 0, 1],
  "Cattle": [0, 0, 0, 0, 3, 2],
  "Deer": [2, 0, 0, 0, 0, 4],
  "Elephant": [2, 0, 0, 0, 0, 3],
  "Horse": [3, 0, 0, 0, 0, 3],
  "Monkey": [0, 3, 2, 2, 2, 4],
  "Sums": [3, 1, 5, 6, 5, 6, 13]
}

const animals = ["Bear", "Boar", "Cattle", "Deer", "Elephant", "Horse", "Monkey"]

const colors = {
  Bear: "#C3F0CA",       // Light Sage Green: Soft and calming
  Boar: "#A7D08B",       // Light Olive Green: Subtle and natural
  Cattle: "#76C843",     // Vibrant Grass Green: Fresh and lively
  Deer: "#58A55C",       // Medium Green: Balanced and soothing
  Elephant: "#4C9A2A",   // Dark Olive Green: Grounded and earthy
  Horse: "#3E8E41",      // Forest Green: Deep and calming
  Monkey: "#2F6A3A",     // Dark Forest Green: Strong and resilient
}



export default function AnimalIntrusionDashboard({ data = sampleData }) {
  const [error, setError] = useState(null)

  // Validate and transform data
  const chartData = data.Dates.map((date, index) => {
    const entry = { date }
    animals.forEach(animal => {
      if (data[animal][index] === undefined) {
        setError(`Missing data for ${animal} on ${date}`)
        return {}
      }
      entry[animal] = data[animal][index]
    })
    return entry
  })

  const totalIntrusions = animals.reduce((acc, animal) => {
    acc[animal] = data[animal].reduce((sum, count) => sum + count, 0)
    return acc
  }, {})

  const grandTotal = Object.values(totalIntrusions).reduce((sum, value) => sum + value, 0)

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col justify-start items-start w-full h-screen">
        <h1 className="text-3xl font-bold text-green-800 mt-5 p-2">Animal Intrusion Detection System</h1>
      <div className="p-2 space-x-8 flex flex-col lg:flex-row justify-center items-start gap-4">
        <div className="gap-4">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-700">Weekly Intrusion Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={colors} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  {animals.map((animal) => (
                    <Bar
                      key={animal}
                      dataKey={animal}
                      fill={colors[animal]}
                      stackId="a"
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <Card key={animal} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-green-600">{animal} Intrusions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-500">{totalIntrusions[animal]}</p>
              </CardContent>
            </Card>
          ))}
              <Card className="bg-green-100 shadow-lg col-span-2">
          <CardHeader>
            <CardTitle className="text-green-800">Total Intrusions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-green-600 text-right">{grandTotal}</p>
          </CardContent>
        </Card>
        </div>

    
      </div>
    </div>
  )
}
